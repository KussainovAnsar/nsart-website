const express = require('express');
const bodyParser = require('body-parser');
const validator = require('validator');
const path = require('path');
const convertUnits = require('convert-units');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

function validateAge(age) {
    return validator.isInt(age.toString(), { min: 1, max: 150 });
}

function calculateBMIValue(height, weight, age, gender) {
    let bmi;
    if (gender === 'male') {
        bmi = weight / (height * height) + (0.1 * age - 5.4);
    } else if (gender === 'female') {
        bmi = weight / (height * height) + (0.1 * age - 5.4) - 0.8;
    } else {
        throw new Error('Invalid gender provided.');
    }
    return { value: bmi };
}

function interpretBMI(bmi) {
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return 'Normal Weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        return 'Overweight';
    } else if (bmi >= 30) {
        return 'Obese';
    } else {
        return 'Invalid BMI';
    }
}

app.route('/bmicalculator')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views', 'BMICalculator.html'));
    })
    .post((req, res) => {
        const height = parseFloat(req.body.height);
        const weight = parseFloat(req.body.weight);
        const age = parseInt(req.body.age);
        const gender = req.body.gender.toLowerCase();
        const unit = req.body.unit.toLowerCase(); 

        if (!validateAge(age)) {
            return res.status(400).send({ error: 'Invalid age. Age must be between 1 and 150.' });
        }

        let convertedHeight;
    
        if (unit === 'metric') {
            convertedHeight = convertUnits(height).from('cm').to('m');
        } else if (unit === 'imperial') {
            convertedHeight = convertUnits(height).from('cm').to('in');
        } else {
            return res.status(400).send({ error: 'Invalid unit provided.' });
        }
        const bmiResult = calculateBMIValue(convertedHeight, weight, age, gender);
        const interpretation = interpretBMI(bmiResult.value);

        res.redirect(`/result?bmi=${bmiResult.value.toFixed(2)}&interpretation=${interpretation}`);
    });

app.get('/result', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'result.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
