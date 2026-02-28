// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(function(span) {
                span.style.transition = 'all 0.3s ease';
            });
            
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formSuccess = document.getElementById('formSuccess');
        
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Reset previous errors
            clearErrors();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Validate Name
            if (name && name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            } else if (name && name.value.trim().length < 2) {
                showError(name, 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate Email
            if (email && email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (email && !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate Subject
            if (subject && subject.value.trim() === '') {
                showError(subject, 'Subject is required');
                isValid = false;
            }
            
            // Validate Message
            if (message && message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            } else if (message && message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If form is valid
            if (isValid) {
                // Show success message
                if (formSuccess) {
                    formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
                    formSuccess.classList.add('show');
                }
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    if (formSuccess) {
                        formSuccess.classList.remove('show');
                    }
                }, 5000);
            }
        });
        
        // Helper function to show error
        function showError(input, message) {
            if (input && input.parentElement) {
                const formGroup = input.parentElement;
                const errorElement = formGroup.querySelector('.error-message');
                input.classList.add('error');
                if (errorElement) {
                    errorElement.textContent = message;
                }
            }
        }
        
        // Helper function to clear all errors
        function clearErrors() {
            const errorMessages = document.querySelectorAll('.error-message');
            const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
            
            errorMessages.forEach(function(error) {
                error.textContent = '';
            });
            
            inputs.forEach(function(input) {
                input.classList.remove('error');
            });
            
            if (formSuccess) {
                formSuccess.classList.remove('show');
            }
        }
        
        // Helper function to validate email
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Add input event listeners to clear errors on typing
        const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
        formInputs.forEach(function(input) {
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const formGroup = this.parentElement;
                    const errorElement = formGroup.querySelector('.error-message');
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }
            });
        });
    }
});