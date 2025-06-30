addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('booking-form');
    const successPopup = document.getElementById('success-popup');
    const closeBtn = document.querySelector('.close-btn');
    const submitBtn = document.querySelector('.tickets');

    
    function validateForm() {
        let isValid = true;
        
      
        const firstname = document.getElementById('firstname');
        const firstnameError = document.getElementById('firstname-error');
        if (firstname.value.length < 2) {
            firstnameError.style.display = 'block';
            isValid = false;
        } else {
            firstnameError.style.display = 'none';
        }

        
        const lastname = document.getElementById('lastname');
        const lastnameError = document.getElementById('lastname-error');
        if (lastname.value.length < 2) {
            lastnameError.style.display = 'block';
            isValid = false;
        } else {
            lastnameError.style.display = 'none';
        }

        
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        const phonePattern = /^\+?[0-9\s\-\(\)]{7,20}$/;
        if (!phonePattern.test(phone.value)) {
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneError.style.display = 'none';
        }

      
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

   
    function showPopup() {
        successPopup.style.display = 'block';
        setTimeout(() => {
            successPopup.style.opacity = '1';
        }, 10);
    }

    
    function hidePopup() {
        successPopup.style.opacity = '0';
        setTimeout(() => {
            successPopup.style.display = 'none';
        }, 300);
    }

    
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            
            showPopup();
            form.reset();
        }
    });

    
    closeBtn.addEventListener('click', hidePopup);

   
    successPopup.addEventListener('click', function(e) {
        if (e.target === successPopup) {
            hidePopup();
        }
    });

   
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && successPopup.style.display === 'block') {
            hidePopup();
        }
    });

   
    successPopup.style.display = 'none';
    successPopup.style.opacity = '0';
    successPopup.style.transition = 'opacity 0.3s ease';







})
