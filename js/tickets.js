addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('booking-form');
    const successPopup = document.getElementById('success-popup');
    const closeBtn = document.querySelector('.close-btn');
    const submitBtn = document.querySelector('.tickets');

    // Form validation function
    function validateForm() {
        let isValid = true;
        
        // First name validation
        const firstname = document.getElementById('firstname');
        const firstnameError = document.getElementById('firstname-error');
        if (firstname.value.length < 2) {
            firstnameError.style.display = 'block';
            isValid = false;
        } else {
            firstnameError.style.display = 'none';
        }

        // Last name validation
        const lastname = document.getElementById('lastname');
        const lastnameError = document.getElementById('lastname-error');
        if (lastname.value.length < 2) {
            lastnameError.style.display = 'block';
            isValid = false;
        } else {
            lastnameError.style.display = 'none';
        }

        // Phone validation
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        const phonePattern = /^\+?[0-9\s\-\(\)]{7,20}$/;
        if (!phonePattern.test(phone.value)) {
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }

        // Email validation
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        return isValid;
    }

    // Show popup
    function showPopup() {
        successPopup.style.display = 'block';
        setTimeout(() => {
            successPopup.style.opacity = '1';
        }, 10);
    }

    // Hide popup
    function hidePopup() {
        successPopup.style.opacity = '0';
        setTimeout(() => {
            successPopup.style.display = 'none';
        }, 300);
    }

    // Form submission
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // Here you would typically send form data to a server
            // For this example, we'll just show the success popup
            showPopup();
            form.reset();
        }
    });

    // Close popup when clicking the close button
    closeBtn.addEventListener('click', hidePopup);

    // Close popup when clicking outside
    successPopup.addEventListener('click', function(e) {
        if (e.target === successPopup) {
            hidePopup();
        }
    });

    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successPopup.style.display === 'block') {
            hidePopup();
        }
    });

    // Initialize popup as hidden
    successPopup.style.display = 'none';
    successPopup.style.opacity = '0';
    successPopup.style.transition = 'opacity 0.3s ease';







})