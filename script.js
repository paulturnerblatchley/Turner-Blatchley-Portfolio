// Navigation Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Improved Fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Make sure we found elements
    console.log('Found ' + fadeElements.length + ' fade-in elements');
    
    function checkFade() {
        fadeElements.forEach(element => {
            // Get element position relative to viewport
            const rect = element.getBoundingClientRect();
            
            // Check if element is in viewport
            if (rect.top < window.innerHeight - 100) {
                element.classList.add('visible');
                console.log('Element made visible');
            }
        });
    }
    
    // Run on scroll events
    window.addEventListener('scroll', checkFade);
    
    // Run on resize events
    window.addEventListener('resize', checkFade);
    
    // Initial check
    setTimeout(checkFade, 100); // Small delay to ensure layout is complete
});

// Gallery Modal
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const galleryItems = document.querySelectorAll('.gallery-item');
const closeModal = document.querySelector('.close-modal');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        modal.style.display = 'flex';
        modalImg.src = this.querySelector('.gallery-image').src;
        modalCaption.innerHTML = this.querySelector('.gallery-caption').innerHTML;
    });
});

closeModal.addEventListener('click', function() {
    modal.style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});

// Video Play Buttons
const playButtons = document.querySelectorAll('.play-button');

playButtons.forEach(button => {
    button.addEventListener('click', function() {
        alert('Video would play here in the final implementation. This is a placeholder for the portfolio demonstration.');
    });
});

