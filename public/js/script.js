
// عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    // تفعيل الوضع الليلي إذا كان مفعل من قبل
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // أنيميشن الظهور
    document.querySelectorAll('.meal-card, .ingredients-container, .steps-list').forEach(el => {
        el.classList.add('fade-in');
        setTimeout(() => el.classList.add('visible'), 100);
    });
});

// زر الوضع الليلي
document.getElementById('toggleDark')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'true' : 'false');
});
