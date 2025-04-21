

// زر المشاركة
document.getElementById('shareBtn')?.addEventListener('click', () => {
    const mealName = document.querySelector('.card-title')?.textContent;
    const shareText = `Try this delicious recipe: ${mealName}`;

    if (navigator.share) {
        navigator.share({
            title: 'Cooking recipe',
            text: shareText,
            url: window.location.href
        }).catch(err => {
            console.error('Sharing error:', err);
            fallbackShare();
        });
    } else {
        fallbackShare();
    }

    function fallbackShare() {
        navigator.clipboard.writeText(`${shareText}\n${window.location.href}`);
        alert('Recipe copied to clipboard! You can share it now.');
    }
});

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
