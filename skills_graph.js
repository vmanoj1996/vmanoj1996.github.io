
document.addEventListener('DOMContentLoaded', function() {

    const treeData = [
        ["Autonomy", "Controls", "Planning", "Perception", "Embedded", "Simulators", "Platforms", "Design Patterns"],
            ["Platforms", "Mobile Robots", "Fixed-Wing", "Quadrotors", "Spacecraft"],
            ["Embedded", "Middleware", "Comm. Protocol", "Codegen"],
                ["Design Patterns", "State Machines", "PubSub", "Producer-consumer", "Super Loop", "Interrupts"],
                ["Middleware", "PX4", "Ardupilot", "FreeRTOS", "ROS2"],
                ["Codegen", "Embed. Coder"],
            ["Perception", "Signal Proc.", "CV", "Sensor Fusion", "Deep Learning"],
                ["Deep Learning", "Architectures", "Data Collection", "Deployment"],
            ["Simulators", "MuJoCo", "Gazebo", "Blender", "Simulink"]
    ];

    const elements = [];
    const links = [];
    const levelColors = {}; // Store the colors for each parent level
    
    // Use D3's schemeCategory10 color scheme
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    
    // Function to assign levels recursively
    function assignLevels(node, level = 0) {
        node.level = level;
        if (node.children) {
            node.children.forEach(child => assignLevels(child, level + 1));  // Increment level for children
        }
    }
    
    // Process the treeData
    const addedNodes = new Set();  // To avoid duplicates
    treeData.forEach(([parent, ...children]) => {
        if (!addedNodes.has(parent)) {
            elements.push({ id: parent, level: 0 });
            addedNodes.add(parent);
        }
        if (!levelColors[parent]) {
            levelColors[parent] = colorScale(parent);  // Assign color from color scale
        }
        children.forEach(child => {
            if (!addedNodes.has(child)) {
                elements.push({ id: child, parent: parent });
                addedNodes.add(child);
            }
            links.push({ source: parent, target: child });
        });
    });

    // Assign levels to all elements
    elements.forEach(node => assignLevels(node));

    // const width = 900, height = 900; // Canvas dimensions
    // const svg = d3.select("#skillsGraph")
    //     .append("svg")
    //     .attr("width", width)
    //     .attr("height", height);
    
    // Dynamically set the SVG width and height based on the window size
    const container = d3.select("#skillsGraph");
    const containerWidth = container.node().getBoundingClientRect().width;
    const containerHeight = container.node().getBoundingClientRect().height;

    const svg = container.append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight);

    // Set base dimensions, scaling factors, and minimum size
    const baseWidth = 110;
    const baseHeight = 30;
    const baseFontSize = 12;
    const scaleFactor = 0.8;  // Scaling factor for each level down the tree
    const minWidth = 60;      // Minimum box width
    const minHeight = 15;     // Minimum box height
    const minFontSize = 10;   // Minimum font size

    const simulation = d3.forceSimulation(elements)
        .force("link", d3.forceLink(links).id(d => d.id).distance(d => 70 - (d.source.level * 40))) 
        .force("charge", d3.forceManyBody().strength(-160))  // Reduce repulsion force
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(d => 58)) // Add a collision force to prevent overlap
        .on("tick", ticked);

    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", "#aaa")
        .attr("stroke-width", 2);

    const node = svg.append("g")
        .selectAll("g")
        .data(elements)
        .enter().append("g")
        .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded));
    
    // Helper function to find all descendants (subtree) of a node
    function getDescendants(nodeId) {
        const descendants = new Set();
        const findChildren = (parentId) => {
            links.forEach(link => {
                if (link.source.id === parentId) {
                    descendants.add(link.target.id);
                    findChildren(link.target.id);  // Recursive search for all children
                }
            });
        };
        findChildren(nodeId);
        return descendants;
    }

    // Hover and highlight function
    // Highlight immediate children only
    function highlightSubtree(d) {
        // Find immediate children by checking the links array
        const children = new Set();
        links.forEach(link => {
            if (link.source.id === d.id) {
                children.add(link.target.id);  // Add immediate children
            }
        });
    
        // Highlight the immediate children in yellow, and adjust transparency
        node.selectAll("rect")
            .attr("fill", n => children.has(n.id) ? "#FFD700" : levelColors[n.parent || n.id])  // Highlight children in yellow
            .attr("opacity", n => children.has(n.id) || n.id === d.id ? 1 : 0.5);  // Set opacity: 1 for hovered and children, 0.5 for others
    
        // Adjust transparency for text elements as well
        node.selectAll("text")
            .attr("opacity", n => children.has(n.id) || n.id === d.id ? 1 : 0.5);  // Same opacity rule for text
    }
    
    function resetHighlight() {
        // Reset the highlight and restore full opacity to all nodes
        node.selectAll("rect")
            .attr("fill", n => levelColors[n.parent || n.id])  // Reset to original color
            .attr("opacity", 1);  // Restore full opacity
    
        // Reset opacity for text as well
        node.selectAll("text")
            .attr("opacity", 1);  // Restore full opacity for text
    }
    

    // Apply hover to both rect and text with fixed sizes, except for "Autonomy"
    node.append("rect")
        .attr("width", d => d.id === "Autonomy" ? baseWidth + 50 : baseWidth)  // Bigger width for "Autonomy"
        .attr("height", d => d.id === "Autonomy" ? baseHeight + 20 : baseHeight)  // Bigger height for "Autonomy"
        .attr("x", d => d.id === "Autonomy" ? -(baseWidth + 50) / 2 : -(baseWidth / 2))  // Center the box
        .attr("y", d => d.id === "Autonomy" ? -(baseHeight + 20) / 2 : -(baseHeight / 2))  // Adjust y-position
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", d => levelColors[d.parent || d.id])  // Use the parent color or self color if it's a parent node
        // .attr("stroke", "#000")
        // .attr("stroke-width", 2)
        .on("mouseover", function(event, d) { highlightSubtree(d); })
        .on("mouseout", resetHighlight);

    // Add hover functionality to text as well, with fixed font size and white text for "Autonomy"
    node.append("text")
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text(d => d.id)
        .attr("fill", d => d.id === "Autonomy" ? "#FFF" : "#000")  // White font for "Autonomy"
        .style("font-size", d => d.id === "Autonomy" ? `${baseFontSize + 4}px` : `${baseFontSize}px`)  // Slightly larger font for "Autonomy"
        .style("font-weight", d => d.id === "Autonomy" ? "bold" : "bold")  // Make "Autonomy" bold
        .on("mouseover", function(event, d) { highlightSubtree(d); })  // Hover over text
        .on("mouseout", resetHighlight);  // Reset on mouseout

    
    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${clamp(d.x, 50, width - 50)}, ${clamp(d.y, 50, height - 50)})`);  // Clamp node positions within canvas
    }

    // Clamp function to restrict node positions within canvas bounds
    function clamp(val, min, max) {
        return Math.max(min, Math.min(max, val));
    }

    function dragStarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragEnded(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
});