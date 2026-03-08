document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        
        document.querySelectorAll('.form-control.is-invalid, .form-select.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());

        let isValid = true;

        
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        
        if (fullnameValue === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else {
            const words = fullnameValue.split(' ').filter(word => word.length > 0);
            if (words.length < 2) {
                showError(fullname, 'Введите фамилию и имя');
                isValid = false;
            }
        }

        
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email (пример: name@example.com)');
            isValid = false;
        }

        
        const topic = document.getElementById('topic');
        const topicValue = topic.value;
        
        if (topicValue === '') {
            showError(topic, 'Выберите тему обращения');
            isValid = false;
        }

        
        const message = document.getElementById('message');
        const messageValue = message.value.trim();
        
        if (messageValue === '') {
            showError(message, 'Введите текст сообщения');
            isValid = false;
        }

        
        const agreement = document.getElementById('agreement');
        
        if (!agreement.checked) {
            showError(agreement, 'Необходимо согласие на обработку персональных данных');
            isValid = false;
        }

       
        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                email: emailValue,
                topic: topic.options[topic.selectedIndex].text,
                message: messageValue,
                agreement: agreement.checked,
                timestamp: new Date().toLocaleString()
            };
            
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            
            alert('Форма отправлена! Данные в консоли.');
        }
    });

    
    function showError(input, message) {
        
        input.classList.add('is-invalid');
        
        
        const feedback = document.createElement('div');
        feedback.classList.add('invalid-feedback');
        feedback.textContent = message;
        
        
        if (input.type === 'checkbox') {
            input.parentNode.appendChild(feedback);
        } else {
            input.insertAdjacentElement('afterend', feedback);
        }
    }

   
    document.querySelectorAll('.form-control, .form-select, .form-check-input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
            const parent = this.parentNode;
            const errors = parent.querySelectorAll('.invalid-feedback');
            errors.forEach(el => el.remove());
        });
        
       
        if (input.type === 'checkbox') {
            input.addEventListener('change', function() {
                this.classList.remove('is-invalid');
                const parent = this.parentNode;
                const errors = parent.querySelectorAll('.invalid-feedback');
                errors.forEach(el => el.remove());
            });
        }
    });
});