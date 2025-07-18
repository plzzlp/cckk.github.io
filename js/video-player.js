// Enhanced Video Player Functionality
class VideoPlayer {
    constructor() {
        this.player = document.createElement('div');
        this.player.className = 'video-player';
        this.player.innerHTML = `
            <div class="player-container">
                <div class="player-header">
                    <span class="player-title">Now Playing</span>
                    <button class="close-player">&times;</button>
                </div>
                <video controls>
                    Your browser does not support the video tag.
                </video>
                <div class="player-controls">
                    <button class="play-pause-btn">⏸</button>
                    <div class="progress-bar">
                        <div class="progress"></div>
                    </div>
                    <div class="time-display">00:00 / 00:00</div>
                    <button class="fullscreen-btn">⛶</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.player);
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const video = this.player.querySelector('video');
        const closeBtn = this.player.querySelector('.close-player');
        const playPauseBtn = this.player.querySelector('.play-pause-btn');
        const progressBar = this.player.querySelector('.progress');
        const progressContainer = this.player.querySelector('.progress-bar');
        const timeDisplay = this.player.querySelector('.time-display');
        const fullscreenBtn = this.player.querySelector('.fullscreen-btn');
        
        // Play/Pause toggle
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.textContent = '⏸';
            } else {
                video.pause();
                playPauseBtn.textContent = '▶';
            }
        });
        
        // Update progress bar
        video.addEventListener('timeupdate', () => {
            const percent = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${percent}%`;
            
            // Update time display
            const currentMinutes = Math.floor(video.currentTime / 60);
            const currentSeconds = Math.floor(video.currentTime % 60);
            const durationMinutes = Math.floor(video.duration / 60);
            const durationSeconds = Math.floor(video.duration % 60);
            
            timeDisplay.textContent = 
                `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} / 
                 ${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
        });
        
        // Click on progress bar to seek
        progressContainer.addEventListener('click', (e) => {
            const width = progressContainer.clientWidth;
            const clickX = e.offsetX;
            const duration = video.duration;
            
            video.currentTime = (clickX / width) * duration;
        });
        
        // Fullscreen toggle
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                this.player.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
                fullscreenBtn.textContent = '⛶';
            } else {
                document.exitFullscreen();
                fullscreenBtn.textContent = '⛶';
            }
        });
        
        // Close player
        closeBtn.addEventListener('click', () => {
            this.close();
        });
    }
    
    play(videoUrl, title) {
        const video = this.player.querySelector('video');
        const titleElement = this.player.querySelector('.player-title');
        
        video.src = videoUrl;
        titleElement.textContent = title || 'Now Playing';
        
        this.player.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        video.play();
    }
    
    close() {
        const video = this.player.querySelector('video');
        
        video.pause();
        video.src = '';
        this.player.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Initialize video player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = new VideoPlayer();
    
    // Example of how to play a video
    // videoPlayer.play('videos/trailers/movie1-trailer.mp4', 'Movie Title');
    
    // You would typically call videoPlayer.play() when a movie item is clicked
    document.querySelectorAll('.movie-item').forEach(item => {
        item.addEventListener('click', function() {
            const movieId = this.getAttribute('data-id');
            const title = this.querySelector('.movie-title').textContent;
            const videoUrl = `videos/trailers/movie${movieId}-trailer.mp4`;
            
            videoPlayer.play(videoUrl, title);
        });
    });
});
