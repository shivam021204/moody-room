const video = document.getElementById('bg-video');
const buttons = document.querySelectorAll('.mood-btn');
const volumeSlider = document.querySelector('.volume-slider');
const volumeIcon = document.querySelector('.volume-icon');

// Set initial volume
video.volume = 0.7;

// Control loop timing - loop before video actually ends to avoid break
video.addEventListener('timeupdate', () => {
    // Loop 0.5 seconds before the end to avoid black screen
    if (video.currentTime >= video.duration - 0.5) {
        video.currentTime = 0;
        video.play();
    }
});

// Auto-start first video when page loads
video.addEventListener('canplay', () => {
    video.play().catch(error => {
        console.log('Autoplay blocked, waiting for user interaction');
    });
});

// Make video visible when it starts playing
video.addEventListener('playing', () => {
    video.classList.add('active');
});

// Switch videos on button click
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const newSrc = btn.getAttribute('data-video');
        const sourceElement = video.querySelector('source');

        // Update active button
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Change video if different
        if (!sourceElement.src.includes(newSrc)) {
            // Fade out
            video.classList.remove('active');
            
            // Load and play new video after fade
            setTimeout(() => {
                sourceElement.src = newSrc;
                video.load();
                video.play();
            }, 500);
        }
    });
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value / 100;
    video.volume = value;

    // Update icon
    if (value === 0) {
        volumeIcon.textContent = '🔇';
    } else if (value < 0.5) {
        volumeIcon.textContent = '🔉';
    } else {
        volumeIcon.textContent = '🔊';
    }
});