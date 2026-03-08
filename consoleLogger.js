document.addEventListener('DOMContentLoaded', function() {
    
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;
        
        
        console.clear();
        
        
        console.log('=== ОТПРАВКА ФОРМЫ ===');
        console.log('ФИО:', formData.fullname);
        console.log('Email:', formData.email);
        console.log('Тема обращения:', formData.topic);
        console.log('Сообщение:', formData.message);
        console.log('Согласие на обработку:', formData.agreement ? 'Да' : 'Нет');
        console.log('Время отправки:', formData.timestamp);
        console.log('=====================');
        
        
        console.table({
            'ФИО': formData.fullname,
            'Email': formData.email,
            'Тема': formData.topic,
            'Сообщение': formData.message.substring(0, 30) + (formData.message.length > 30 ? '...' : ''),
            'Согласие': formData.agreement ? 'Да' : 'Нет'
        });
    });
});
