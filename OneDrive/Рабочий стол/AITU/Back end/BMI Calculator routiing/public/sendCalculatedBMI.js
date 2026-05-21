function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value.toLowerCase();
    const unit = document.getElementById('unit').value.toLowerCase();

    fetch('/bmicalculator', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            height: height,
            weight: weight,
            age: age,
            gender: gender,
            unit: unit
        })
    })
    .then(response => response.json())

    .then(data => {
        document.getElementById('bmiResult').innerText = `BMI: ${data.bmi}`;
        document.getElementById('interpretationResult').innerText = data.interpretation;
    })

    .then(data => {
        window.location.href = `/result?bmi=${data.bmi}&interpretation=${data.interpretation}`;
    })
    
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('bmiResult').innerText = 'N/A';
        document.getElementById('interpretationResult').innerText = 'Failed to calculate BMI. Please try again.';
    });
}

document.getElementById('bmiForm').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateBMI();
});