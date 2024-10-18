
document.addEventListener('DOMContentLoaded', function() {

    const treeData = [
        ["Autonomy", "Controls", "Perception", "Embedded", "Simulators", "Platforms"],
            ["Platforms", "Mobile Robots", "Fixed-Wing", "Quadrotors", "Spacecraft"],
            ["Embedded", "Middleware", "Design Patterns", "Protocol", "Codegen", "Scheduler"],
                ["Design Patterns", "State Machines", "PubSub", "Producer-consumer", "Super Loop", "Interrupts"],
                ["Scheduler", "Cooperative", "Preemptive"],
                ["Middleware", "PX4", "Ardupilot", "FreeRTOS", "ROS2"],
                ["Codegen", "Embed. Coder"],
            ["Perception", "Signal Proc.", "CV", "Sensor Fusion"],
                ["CV", "Deep Learning"],
            ["Deep Learning", "Architectures", "Optimization", "Data Collection", "Deployment"],
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

    const width = 1000, height = 800; // Canvas dimensions

    const svg = d3.select("#skillsGraph")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // Set base dimensions, scaling factors, and minimum size
    const baseWidth = 120;
    const baseHeight = 25;
    const baseFontSize = 16;
    const scaleFactor = 0.8;  // Scaling factor for each level down the tree
    const minWidth = 60;      // Minimum box width
    const minHeight = 15;     // Minimum box height
    const minFontSize = 10;   // Minimum font size

    const simulation = d3.forceSimulation(elements)
        .force("link", d3.forceLink(links).id(d => d.id).distance(80)) // Increase distance between nodes
        .force("charge", d3.forceManyBody().strength(-200))  // Reduce repulsion force
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("collision", d3.forceCollide().radius(d => 60)) // Add a collision force to prevent overlap
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

    node.append("rect")
        .attr("width", d => Math.max(baseWidth * Math.pow(scaleFactor, d.level), minWidth))  // Scale width, with a minimum
        .attr("height", d => Math.max(baseHeight * Math.pow(scaleFactor, d.level), minHeight)) // Scale height, with a minimum
        .attr("x", d => -(Math.max(baseWidth * Math.pow(scaleFactor, d.level), minWidth)) / 2) // Center the box
        .attr("y", d => -(Math.max(baseHeight * Math.pow(scaleFactor, d.level), minHeight)) / 2) // Adjust y-position
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", d => levelColors[d.parent || d.id]) // Use the parent color or self color if it's a parent node
        .attr("stroke", "#000")
        .attr("stroke-width", 2);

    node.append("text")
        .attr("dy", 5)
        .attr("text-anchor", "middle")
        .text(d => d.id)
        .attr("fill", "#000")
        .style("font-size", d => `${Math.max(baseFontSize * Math.pow(scaleFactor, d.level), minFontSize)}px`);  // Scale font, with a minimum

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