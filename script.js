document.addEventListener('DOMContentLoaded', () => {
    // Inject the navigation bar into the page
    const navbarHTML = `
    <nav class="navbar">
        <div class="logo">Manoj Velmurugan</div>
        <ul class="nav_links" id="nav_links">
            <li><a href="index.html">Home</a></li>
            <li><a href="tech_odyssey.html">My Tech Odyssey</a></li>
            <li><a href="media.html">Media</a></li>
            <li><a href="publications.html">Publications</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
        <div class="burger" id="burger">
            <div class="line1"></div>
            <div class="line2"></div>
            <div class="line3"></div>
        </div>
    </nav>`;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // Burger menu functionality
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav_links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav_active');
    });

    // Close the navigation menu when a link is clicked (optional enhancement)
    navLinks.addEventListener('click', () => {
        if (navLinks.classList.contains('nav_active')) {
            navLinks.classList.remove('nav_active');
        }
    });
});