// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('show');
        });
    }
    
    // Load featured content
    loadFeaturedContent();
    
    // Initialize video player modal
    initVideoPlayer();
});

// Load Featured Content
function loadFeaturedContent() {
    const contentGrid = document.querySelector('.content-grid');
    
    if (contentGrid) {
        // In a real implementation, this would come from an API
        const featuredContent = [
            {
                id: 1,
                title: "Hitman's Wife's Bodyguard",
                thumb: "videos/thumbs/movie1-thumb.jpg",
                duration: "01:39:00",
                year: "2021",
                rating: 4.2
            },
            {
                id: 2,
                title: "The Suicide Squad",
                thumb: "videos/thumbs/movie2-thumb.jpg",
                duration: "02:12:00",
                year: "2021",
                rating: 4.5
            },
            // Add more items as needed
        ];
        
        let html = '';
        featuredContent.forEach(item => {
            html += `
                <div class="movie-item" data-id="${item.id}">
                    <div class="movie-poster" style="background-image: url('${item.thumb}')">
                        <div class="play-btn">▶</div>
                        <div class="duration">${item.duration}</div>
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${item.title}</h3>
                        <div class="movie-meta">
                            <span class="year">${item.year}</span>
                            <span class="rating">★ ${item.rating}</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        contentGrid.innerHTML = html;
    }
}

// Video Player Modal
function initVideoPlayer() {
    const movieItems = document.querySelectorAll('.movie-item');
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <video controls autoplay>
                Your browser does not support the video tag.
            </video>
        </div>
    `;
    document.body.appendChild(videoModal);
    
    movieItems.forEach(item => {
        item.addEventListener('click', function() {
            const movieId = this.getAttribute('data-id');
            // In a real implementation, get video URL based on ID
            const videoUrl = `videos/trailers/movie${movieId}-trailer.mp4`;
            
            const videoElement = videoModal.querySelector('video');
            videoElement.src = videoUrl;
            
            videoModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    videoModal.querySelector('.close-modal').addEventListener('click', function() {
        videoModal.style.display = 'none';
        const videoElement = videoModal.querySelector('video');
        videoElement.pause();
        document.body.style.overflow = 'auto';
    });
    
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            const videoElement = videoModal.querySelector('video');
            videoElement.pause();
            document.body.style.overflow = 'auto';
        }
    });
                                }
