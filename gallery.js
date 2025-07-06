// Array of media items (links from Dropbox or any hosting service)
const mediaItems = [
    {
        type: 'image',
        src: 'https://dl.dropbox.com/scl/fi/y5h2rcm4sxewlb5bn9dv6/nerc.jpg?rlkey=js2ty2oepvlbf21btju184zei&st=nhexhbsr&dl=0',
        caption: 'Showcasing the VizFlyt framework at NERC 2024: "VizFlyt: Perception-centric Pedagogical Framework for Autonomous Aerial Robots," accepted at ICRA 2025.'
    },
    {
        type: 'image',
        src: 'https://dl.dropbox.com/scl/fi/r0vhp1na2val1pwd9heab/mp_teaching.jpg?rlkey=dcfkwijtbgqouiyfs5j33xmyn&st=p1i72pif&dl=0',
        caption: 'Teaching motion planning to the next generation of robotics engineers during the Aerial Robotics course (Fall 2023).'
    },
    {
        type: 'iframe',
        src: 'https://dl.dropbox.com/scl/fi/zjvsdha3722adg9ay1ou0/Homepage-Video-Feb-2024_trim.mp4?rlkey=b9k237jpycauzh7nxihifllij&st=gwkt52xn&raw=1',
        caption: 'The thrilling Aerial Robotics final race, highlighted on the WPI Homepage (Fall 2023).'
    },
    {
        type: 'iframe',
        src: 'https://www.youtube.com/embed/b3mI7rkSX0g?si=aXtvBhUANRoJV6df?rel=0',
        caption: 'Highlighting our lab’s work in the VICON WPI Case Study, demonstrating advanced motion capture applications.'
    }

    // You can add more images and videos here
];


// Prepare items for LightGallery
const items = mediaItems.map(item => {
    if (item.type === 'image') {
        return {
            src: item.src,
            subHtml: `<h4>${item.caption}</h4>`,
        };
    } else if (item.type === 'iframe') {
        return {
            src: item.src,
            iframe: true,
            subHtml: `<h4>${item.caption}</h4>`,
        };
    }
});

// Initialize LightGallery with autoplay and download disabled
const lgContainer = document.getElementById('inline-gallery-container');
const inlineGallery = lightGallery(lgContainer, {
    container: lgContainer,
    dynamic: true,
    hash: false,
    closable: false,
    showMaximizeIcon: true,
    appendSubHtmlTo: '.lg-item',
    dynamicEl: items,
    plugins: [lgAutoplay, lgVideo],
    autoplay: true,           // Enable autoplay
    pause: 3000,              // Delay between slides (3000ms = 3 seconds)
    speed: 600,               // Transition speed (600ms)
    loop: true,               // Enable looping
    download: false           // Disable download button
});

// Open gallery automatically on load
inlineGallery.openGallery();
