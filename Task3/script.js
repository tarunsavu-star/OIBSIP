const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertButton = document.getElementById("convertBtn");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");
const message = document.getElementById("message");

convertButton.addEventListener("click", convertTemperature);

function convertTemperature() {

    const value = parseFloat(temperatureInput.value);
    const unit = unitSelect.value;

    // Check empty or invalid input
    if (temperatureInput.value.trim() === "" || isNaN(value)) {
        showError("Please enter a valid temperature.");
        clearResults();
        return;
    }

    // Check absolute zero limits
    if (unit === "celsius" && value < -273.15) {
        showError("Celsius temperature cannot be below -273.15°C.");
        clearResults();
        return;
    }

    if (unit === "fahrenheit" && value < -459.67) {
        showError("Fahrenheit temperature cannot be below -459.67°F.");
        clearResults();
        return;
    }

    if (unit === "kelvin" && value < 0) {
        showError("Kelvin temperature cannot be below 0 K.");
        clearResults();
        return;
    }

    let celsius;
    let fahrenheit;
    let kelvin;

    // Convert from Celsius
    if (unit === "celsius") {

        celsius = value;
        fahrenheit = (value * 9 / 5) + 32;
        kelvin = value + 273.15;

    }

    // Convert from Fahrenheit
    else if (unit === "fahrenheit") {

        celsius = (value - 32) * 5 / 9;
        fahrenheit = value;
        kelvin = celsius + 273.15;

    }

    // Convert from Kelvin
    else if (unit === "kelvin") {

        celsius = value - 273.15;
        fahrenheit = (celsius * 9 / 5) + 32;
        kelvin = value;

    }

    // Display results
    celsiusResult.textContent =
        celsius.toFixed(2) + " °C";

    fahrenheitResult.textContent =
        fahrenheit.toFixed(2) + " °F";

    kelvinResult.textContent =
        kelvin.toFixed(2) + " K";

    message.textContent = "Temperature converted successfully.";
    message.style.color = "#4f7d63";
}


function showError(text) {
    message.textContent = text;
    message.style.color = "#c0392b";
}


function clearResults() {

    celsiusResult.textContent = "-- °C";
    fahrenheitResult.textContent = "-- °F";
    kelvinResult.textContent = "-- K";

}
