const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

// الرئيسية
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        const meal = response.data.meals[0];

        if (meal.strInstructions) {
            meal.instructionsSteps = meal.strInstructions
                .split('\r\n')
                .filter(step => step.trim() !== '');
        }

        res.render('index', { meal });
    } catch (error) {
        res.status(500).send('حدث خطأ أثناء جلب البيانات!');
    }
});

app.listen(PORT, () => {
    console.log(`الموقع يعمل على http://localhost:${PORT}`);
});
app.get('/favorites', (req, res) => {
    res.render('favorites');
});
