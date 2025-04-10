// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation classes to elements
document.querySelectorAll('.project-card, .skill-item').forEach(element => {
    element.classList.add('fade-in');
});

// Continuous typing animation for hero section
const typingText = document.querySelector('.typing-text');
const text = "Hi, I'm Sofie Budman";
let i = 0;
let isDeleting = false;
let typingSpeed = 100;
let pauseTime = 1500; // Pause time at the end of typing/deleting

function typeWriter() {
    const currentText = typingText.textContent;
    
    if (isDeleting) {
        // Deleting text
        typingText.textContent = text.substring(0, currentText.length - 1);
        typingSpeed = 50; // Faster when deleting
    } else {
        // Typing text
        typingText.textContent = text.substring(0, currentText.length + 1);
        typingSpeed = 100; // Normal speed when typing
    }
    
    // If we've finished typing
    if (!isDeleting && currentText === text) {
        // Pause at the end of typing
        typingSpeed = pauseTime;
        isDeleting = true;
    } 
    // If we've finished deleting
    else if (isDeleting && currentText === '') {
        isDeleting = false;
        typingSpeed = 500; // Pause before starting to type again
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add CSS classes for animations
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .scroll-down {
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
        }
        
        .scroll-up {
            transform: translateY(0);
            transition: transform 0.3s ease-in-out;
        }
        
        .typing-text {
            white-space: nowrap;
            overflow: hidden;
            min-height: 1.2em;
        }
        
        @keyframes blink {
            from, to { border-color: transparent }
            50% { border-color: var(--primary-color); }
        }
    </style>
`); 