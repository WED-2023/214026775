// Gallery Functionality
let currentIndex = 0;
const gallery = document.getElementById('mainGallery');
const thumbnails = document.querySelectorAll('.thumbnail');
const totalImages = gallery.children.length;

function scrollGallery(direction) {
    currentIndex = (currentIndex + direction + totalImages) % totalImages;
    updateGallery();
}

function showImage(index) {
    currentIndex = index;
    updateGallery();
}

function updateGallery() {
    gallery.scrollTo({
        left: gallery.children[currentIndex].offsetLeft,
        behavior: 'smooth'
    });

    // Update active thumbnail
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentIndex);
    });
}

// Auto-scroll every 5 seconds
setInterval(() => {
    scrollGallery(1);
}, 5000);

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

// Like Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const likeButton = document.getElementById('likeButton');
    const likeCount = document.getElementById('likeCount');
    
    // Get the current like count from localStorage or set to 0
    let count = parseInt(localStorage.getItem('likeCount')) || 0;
    likeCount.textContent = count;
    
    // Check if the user has already liked
    const hasLiked = localStorage.getItem('hasLiked') === 'true';
    if (hasLiked) {
        likeButton.classList.add('liked');
    }
    
    likeButton.addEventListener('click', function() {
        if (!hasLiked) {
            // Increment the count
            count++;
            localStorage.setItem('likeCount', count);
            localStorage.setItem('hasLiked', 'true');
            
            // Update the display
            likeCount.textContent = count;
            likeButton.classList.add('liked');
            
            // Add animation
            likeButton.style.animation = 'none';
            likeButton.offsetHeight; // Trigger reflow
            likeButton.style.animation = null;
        }
    });
});

// Gallery Navigation
function scrollGallery(direction) {
    const gallery = document.getElementById('mainGallery');
    const scrollAmount = gallery.offsetWidth;
    gallery.scrollBy({
        left: scrollAmount * direction,
        behavior: 'smooth'
    });
}

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const messageTextarea = document.getElementById('message');
    const successMessage = document.querySelector('.success-message');
    const emojiButtons = document.querySelectorAll('.emoji-button');

    // Emoji button functionality
    emojiButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove selected class from all buttons
            emojiButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Add selected class to clicked button
            this.classList.add('selected');
            
            const emoji = this.dataset.emoji;
            const textarea = document.getElementById('message');
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const text = textarea.value;
            const newText = text.substring(0, start) + emoji + text.substring(end);
            textarea.value = newText;
            textarea.focus();
            textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
            
            // Remove selected class after animation
            setTimeout(() => {
                this.classList.remove('selected');
            }, 300);
        });
    });

    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        document.querySelectorAll('.error-message').forEach(msg => {
            msg.style.display = 'none';
        });

        let isValid = true;
        const subject = document.getElementById('subject').value.trim();
        const message = messageTextarea.value.trim();

        // Validate subject
        if (!subject) {
            document.getElementById('subject').parentElement.classList.add('error');
            document.getElementById('subject').nextElementSibling.style.display = 'block';
            isValid = false;
        }

        // Validate message
        if (!message) {
            messageTextarea.parentElement.classList.add('error');
            messageTextarea.nextElementSibling.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            // Show success message
            successMessage.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Reset emoji buttons
            emojiButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        }
    });

    // Clear error messages on input
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.parentElement.classList.remove('error');
            this.nextElementSibling.style.display = 'none';
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 120; // Adjust this value based on your header height
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});