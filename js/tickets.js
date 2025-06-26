addEventListener("DOMContentLoaded", () => {
    document.getElementById('booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        resetErrors();
        let isValid = true;

        const firstname = document.getElementById('firstname');
        if (!firstname.value || firstname.value.length < 2) {
            showError('firstname-error', firstname);
            isValid = false;
        }

        const lastname = document.getElementById('lastname');
        if (!lastname.value || lastname.value.length < 2) {
            showError('lastname-error', lastname);
            isValid = false;
        }


        const phone = document.getElementById('phone');
        const phonePattern = /^\+?[0-9\s\-\(\)]{7,20}$/;
        if (!phonePattern.test(phone.value)) {
            showError('phone-error', phone);
            isValid = false;
        }


        const email = document.getElementById('email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            showError('email-error', email);
            isValid = false;
        }

        if (isValid) {

            alert('Бронирование успешно оформлено! Спасибо.');
            this.reset();
        }
    });

    function showError(errorId, inputElement) {
        document.getElementById(errorId).style.display = 'block';
        inputElement.classList.add('input-error');
    }

    function resetErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => {
            error.style.display = 'none';
        });

        const inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.classList.remove('input-error');
        });
    }


    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('input-error');
            const errorId = this.id + '-error';
            document.getElementById(errorId).style.display = 'none';
        });
    });









})