// Array of media items (links from Dropbox or any hosting service)
const mediaItems = [
    {
        type: 'image',
        src: 'https://dl.dropbox.com/scl/fi/y5h2rcm4sxewlb5bn9dv6/nerc.jpg?rlkey=js2ty2oepvlbf21btju184zei&st=nhexhbsr&dl=0',
        caption: 'Presenter: Northeast Robotics Colloquium (NERC) 2024'
    },
    {
        type: 'image',
        src: 'https://dl.dropbox.com/scl/fi/r0vhp1na2val1pwd9heab/mp_teaching.jpg?rlkey=dcfkwijtbgqouiyfs5j33xmyn&st=p1i72pif&dl=0',
        caption: 'TA: Taught a class on motion planning for Aerial Robotics (Fall 23)'
    },
    {
        type: 'video',
        src: 'https://dl.dropbox.com/scl/fi/zjvsdha3722adg9ay1ou0/Homepage-Video-Feb-2024_trim.mp4?rlkey=b9k237jpycauzh7nxihifllij&st=gwkt52xn&dl=0',
        caption: 'TA: Aerial Robotics final race featured in WPI Homepage (Fall 23)'
    },
    {
        type: 'iframe',
        src: 'https://www.youtube.com/embed/b3mI7rkSX0g?si=aXtvBhUANRoJV6df',
        caption: 'Featured in VICON WPI Case Study'
    }

    // You can add more images and videos here
];

// Function to generate media gallery with captions
function loadGallery() {
    const mediaContent = document.getElementById('media_content');
    mediaItems.forEach(item => {
        const mediaCard = document.createElement('div');
        mediaCard.className = 'media_card';

        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.src;
            img.alt = item.alt;
            mediaCard.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.controls = true;
            const source = document.createElement('source');
            source.src = item.src;
            source.type = 'video/mp4';
            video.appendChild(source);
            mediaCard.appendChild(video);
        }else if (item.type === 'iframe')
        {
            const iframe = document.createElement('iframe');
            iframe.width = '900';
            iframe.height = '506';
            iframe.src = item.src;  // Assuming item.src contains the YouTube embed link
            iframe.title = 'YouTube video player';
            iframe.frameBorder = '0';
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'no-referrer';
            mediaCard.appendChild(iframe);
        }

        // Add caption
        const caption = document.createElement('p');
        caption.className = 'media_caption';
        caption.textContent = item.caption;
        mediaCard.appendChild(caption);

        mediaContent.appendChild(mediaCard);
    });
}

// Load the gallery on page load
document.addEventListener('DOMContentLoaded', loadGallery);
