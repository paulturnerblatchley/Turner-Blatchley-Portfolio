// Navigation Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
	navbar.classList.add('scrolled');
    } else {
	navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const nav = document.querySelectorAll('.nav-link');

burger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    burger.classList.toggle('active');
});

nav.forEach(link => {
    link.addEventListener('click', function() {
	navLinks.classList.remove('active');
	burger.classList.remove('active');
    });
});

// Fade-in animation
const fadeElements = document.querySelectorAll('.fade-in');

function checkFade() {
    fadeElements.forEach(element => {
	const elementTop = element.getBoundingClientRect().top;
	const elementBottom = element.getBoundingClientRect().bottom;
	
	if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
	    element.classList.add('visible');
	}
    });
}

window.addEventListener('scroll', checkFade);
window.addEventListener('resize', checkFade);
window.addEventListener('load', checkFade);

// Initialize check on page load
checkFade();

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
    
// Scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
	e.preventDefault();
	document.querySelector(this.getAttribute('href')).scrollIntoView({
	    behavior: 'smooth'
	});
    });
 });
