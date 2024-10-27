document.addEventListener('DOMContentLoaded', () => {
    // Inject the navigation bar into the page
    const navbarHTML = `
    <nav class="navbar">
        <div class="logo">Manoj Velmurugan</div>
        <ul class="nav_links" id="nav_links">
            <li><a href="index.html">Home</a></li>
            <li><a href="tech_odyssey.html">Projects</a></li>
            <li><a href="skills.html">Skills</a></li>
            <li><a href="publications.html">Publications</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
        <div class="burger" id="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </nav>`;
    // <li><a href="tech_odyssey.html">My Tech Odyssey</a></li>
    // <li><a href="media.html">Media</a></li>

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Burger menu functionality
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav_links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav_active');
    });
});


// MAKE STUFF VISIBLE AFTER LOADING 
document.addEventListener('DOMContentLoaded', () => {
    // Once everything is loaded, add 'loaded' class to the body
    document.body.classList.add('loaded');
});

// <div class="logo">Manoj Velmurugan</div>


// highlight the current page on banner
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav_links li a');
    const currentPage = window.location.pathname.split('/').pop(); // Get current page name

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active'); // Add 'active' class to the matching link
        }
    });
});

// image make it dynamically zoom in
document.addEventListener('DOMContentLoaded', function() {
    var images = document.querySelectorAll('.dynamic-image');
    images.forEach(function(image) {
        var viewer;

        image.addEventListener('dblclick', function() {
            if (!viewer) {
                viewer = new Viewer(image, {
                    hidden: function() {
                        viewer.destroy(); // Ensure the viewer is properly destroyed after closing
                        viewer = null;   // Reset the viewer to null to reinitialize next time
                    },
                    navbar: false, // Customize this as needed
                    toolbar: {
                        zoomIn: 1,
                        zoomOut: 1,
                        oneToOne: 1,
                        reset: 1,
                        prev: 0,
                        play: {
                            show: 0,
                            size: 'large',
                        },
                        next: 0,
                        rotateLeft: 1,
                        rotateRight: 1,
                        flipHorizontal: 1,
                        flipVertical: 1,
                    },
                });
            }
            viewer.show();
        });
    });
});

