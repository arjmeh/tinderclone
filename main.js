document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Swiping functionality
    const card = document.querySelector('.card');
    const btnNo = document.querySelector('.btn-no');
    const btnYes = document.querySelector('.btn-yes');
    const btnSurprise = document.querySelector('.btn-surprise');
    
    // Sample placeholder images (in a real app, these would come from an API)
    const placeholderImages = [
        'https://via.placeholder.com/400x600/ff9999/ffffff?text=Person+1',
        'https://via.placeholder.com/400x600/99ff99/ffffff?text=Person+2',
        'https://via.placeholder.com/400x600/9999ff/ffffff?text=Person+3',
        'https://via.placeholder.com/400x600/ffff99/ffffff?text=Person+4',
        'https://via.placeholder.com/400x600/ff99ff/ffffff?text=Person+5'
    ];
    
    let currentImageIndex = 0;
    
    // Function to load the next image
    function loadNextImage() {
        currentImageIndex = (currentImageIndex + 1) % placeholderImages.length;
        const cardImg = document.querySelector('.card-img img');
        
        // Reset card position and rotation
        card.style.transform = 'translateX(0) rotate(0deg)';
        
        // Change the image with a fade effect
        cardImg.style.opacity = '0';
        setTimeout(() => {
            cardImg.src = placeholderImages[currentImageIndex];
            cardImg.style.opacity = '1';
        }, 300);
    }
    
    // Handle swiping with mouse/touch events
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    
    card.addEventListener('mousedown', startDrag);
    card.addEventListener('touchstart', startDrag);
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);
    
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
        
        // Set transition to none for smooth dragging
        card.style.transition = 'none';
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        // Prevent default to avoid scrolling while dragging
        e.preventDefault();
        
        const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const currentY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
        
        translateX = currentX - startX;
        translateY = currentY - startY;
        
        // Calculate rotation based on horizontal drag
        const rotate = translateX * 0.1;
        
        // Apply transformation
        card.style.transform = `translateX(${translateX}px) translateY(${translateY}px) rotate(${rotate}deg)`;
        
        // Change background color based on direction
        if (translateX > 50) {
            card.style.backgroundColor = 'rgba(76, 175, 80, 0.1)'; // Green for like
        } else if (translateX < -50) {
            card.style.backgroundColor = 'rgba(255, 82, 82, 0.1)'; // Red for dislike
        } else {
            card.style.backgroundColor = 'white';
        }
    }
    
    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        // Restore transition for smooth animation
        card.style.transition = 'transform 0.5s ease, background-color 0.3s ease';
        
        // Determine if it's a like, dislike or reset
        if (translateX > 100) {
            // Like - swipe right
            card.style.transform = 'translateX(1000px) rotate(30deg)';
            handleLike();
        } else if (translateX < -100) {
            // Dislike - swipe left
            card.style.transform = 'translateX(-1000px) rotate(-30deg)';
            handleDislike();
        } else {
            // Reset position
            card.style.transform = 'translateX(0) rotate(0deg)';
            card.style.backgroundColor = 'white';
        }
    }
    
    // Button click handlers
    if (btnYes) {
        btnYes.addEventListener('click', function() {
            card.style.transform = 'translateX(1000px) rotate(30deg)';
            handleLike();
        });
    }
    
    if (btnNo) {
        btnNo.addEventListener('click', function() {
            card.style.transform = 'translateX(-1000px) rotate(-30deg)';
            handleDislike();
        });
    }
    
    if (btnSurprise) {
        btnSurprise.addEventListener('click', function() {
            // Reset position first
            card.style.transform = 'translateX(0) rotate(0deg)';
            // Then load random image
            currentImageIndex = Math.floor(Math.random() * placeholderImages.length);
            document.querySelector('.card-img img').src = placeholderImages[currentImageIndex];
        });
    }
    
    function handleLike() {
        console.log('Liked profile:', placeholderImages[currentImageIndex]);
        // In a real app, send this data to the server
        setTimeout(loadNextImage, 500);
    }
    
    function handleDislike() {
        console.log('Disliked profile:', placeholderImages[currentImageIndex]);
        // In a real app, send this data to the server
        setTimeout(loadNextImage, 500);
    }
});