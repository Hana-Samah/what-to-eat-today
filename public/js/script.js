window.addEventListener('DOMContentLoaded', () => {
    // تفعيل الوضع الليلي إذا كان مفعل
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // أنيميشن
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
    });
});

// زر الوضع الليلي
document.getElementById('toggleDark')?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'true' : 'false');
});

// زر مشاركة الصورة
document.getElementById('shareImageBtn')?.addEventListener('click', () => {
    const captureElement = document.getElementById('capture-area');
    html2canvas(captureElement, {
        useCORS: true,
        scale: 2
    }).then(canvas => {
        canvas.toBlob(blob => {
            const file = new File([blob], "recipe.png", { type: "image/png" });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({
                    files: [file],
                    title: 'وصفة اليوم',
                    text: 'جرب هذه الوصفة اللذيذة!',
                }).catch(err => {
                    alert("جهازك لا يدعم المشاركة بالصور.");
                });
            } else {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(file);
                link.download = 'recipe.png';
                link.click();
            }
        });
    });
});
function toggleFavorite(mealId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.includes(mealId)) {
        favorites = favorites.filter(id => id !== mealId);
        alert("تمت إزالة الوصفة من المفضلة");
    } else {
        favorites.push(mealId);
        alert("تمت إضافة الوصفة إلى المفضلة!");
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// للتجربة: عرض قائمة المفضلة في الكونسول عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
        console.log("المفضلة:", JSON.parse(saved));
    }
});
function addToFavorites() {
    const meal = window.mealData;
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.find(fav => fav.idMeal === meal.idMeal)) {
        favorites.push(meal);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert("تمت الإضافة إلى المفضلة!");
    } else {
        alert("الوصفة موجودة مسبقًا في المفضلة.");
    }
}
