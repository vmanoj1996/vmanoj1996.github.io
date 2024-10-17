// Array of media items (links from Dropbox or any hosting service)
const mediaItems = [
    {
        type: 'image',
        src: 'https://www.dropbox.com/scl/fi/3mrjyoromdv5ocps8u0uh/nerc.jpg?rlkey=51ufe8y8lxezxogosx4fdowr0&st=ecz1qqzr&dl=0',
        alt: 'NERC Symposium',
    },
    {
        type: 'image',
        src: 'https://www.dropbox.com/scl/fi/0t3jqhct5j08kbmbpgyho/mp_teaching.jpg?raw=1',
        alt: 'Lecture On Motion Planning',
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
