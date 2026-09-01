document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("temperatureInput");
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");

    const convertBtn = document.getElementById("convertBtn");
    const clearBtn = document.getElementById("clearBtn");
    const swapBtn = document.getElementById("swapBtn");

    const resultNumber = document.getElementById("resultNumber");
    const resultUnit = document.getElementById("resultUnit");

    const inputSymbol = document.getElementById("inputSymbol");
    const heroTemp = document.getElementById("heroTemp");

    const status = document.getElementById("temperatureStatus");
    const formulaText = document.getElementById("formulaText");

    const copyBtn = document.getElementById("copyBtn");
    const themeBtn = document.getElementById("themeBtn");

    const historyList = document.getElementById("historyList");
    const clearHistoryBtn = document.getElementById("clearHistoryBtn");

    const toast = document.getElementById("toast");
    const year = document.getElementById("year");

    let history = JSON.parse(localStorage.getItem("temperatureHistory")) || [];


    /* YEAR */

    year.textContent = new Date().getFullYear();


    /* UNIT SYMBOL */

    function getSymbol(unit) {
        if (unit === "C") return "°C";
        if (unit === "F") return "°F";
        return "K";
    }


    function updateInputSymbol() {
        inputSymbol.textContent = getSymbol(fromUnit.value);
    }

    fromUnit.addEventListener("change", updateInputSymbol);


    /* CONVERSION */

    function convertTemperature(value, from, to) {

        let celsius;

        if (from === "C") {
            celsius = value;
        }

        else if (from === "F") {
            celsius = (value - 32) * 5 / 9;
        }

        else if (from === "K") {
            celsius = value - 273.15;
        }

        if (to === "C") {
            return celsius;
        }

        if (to === "F") {
            return (celsius * 9 / 5) + 32;
        }

        if (to === "K") {
            return celsius + 273.15;
        }
    }


    /* FORMULA */

    function getFormula(from, to) {

        if (from === to) {
            return "Same unit — no conversion required.";
        }

        const formulas = {
            "C-F": "°F = (°C × 9/5) + 32",
            "F-C": "°C = (°F − 32) × 5/9",
            "C-K": "K = °C + 273.15",
            "K-C": "°C = K − 273.15",
            "F-K": "K = (°F − 32) × 5/9 + 273.15",
            "K-F": "°F = (K − 273.15) × 9/5 + 32"
        };

        return formulas[`${from}-${to}`] || "";
    }


    /* TEMPERATURE STATUS */

    function getStatus(celsius) {

        if (celsius <= 0) {
            return "❄️ Freezing temperature";
        }

        if (celsius <= 15) {
            return "🧥 Cold temperature";
        }

        if (celsius <= 30) {
            return "🌤️ Comfortable temperature";
        }

        if (celsius <= 40) {
            return "☀️ Hot temperature";
        }

        return "🔥 Very hot temperature";
    }


    /* SHOW TOAST */

    function showToast(message) {

        toast.textContent = message;
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }


    /* CONVERT */

    function convert() {

        const value = parseFloat(input.value);

        if (Number.isNaN(value)) {
            showToast("Please enter a temperature.");
            return;
        }

        if (fromUnit.value === "K" && value < 0) {
            showToast("Kelvin cannot be below 0.");
            return;
        }

        const result = convertTemperature(
            value,
            fromUnit.value,
            toUnit.value
        );

        const rounded = Number(result.toFixed(2));

        resultNumber.textContent = rounded;
        resultUnit.textContent = getSymbol(toUnit.value);

        formulaText.textContent = getFormula(
            fromUnit.value,
            toUnit.value
        );

        let celsius;

        if (fromUnit.value === "C") {
            celsius = value;
        } else if (fromUnit.value === "F") {
            celsius = (value - 32) * 5 / 9;
        } else {
            celsius = value - 273.15;
        }

        status.textContent = getStatus(celsius);

        heroTemp.textContent = `${rounded}°`;

        addHistory(
            value,
            fromUnit.value,
            rounded,
            toUnit.value
        );
    }


    convertBtn.addEventListener("click", convert);


    /* ENTER KEY */

    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {
            convert();
        }

    });


    /* SWAP */

    swapBtn.addEventListener("click", () => {

        const oldFrom = fromUnit.value;

        fromUnit.value = toUnit.value;
        toUnit.value = oldFrom;

        updateInputSymbol();

        if (input.value !== "") {
            convert();
        }
    });


    /* CLEAR */

    clearBtn.addEventListener("click", () => {

        input.value = "";

        resultNumber.textContent = "0";
        resultUnit.textContent = getSymbol(toUnit.value);

        status.textContent = "Waiting for temperature...";

        formulaText.textContent =
            "Enter a temperature to see the formula.";

        heroTemp.textContent = "25°";

        input.focus();
    });


    /* QUICK VALUES */

    document.querySelectorAll(".quick-card").forEach(card => {

        card.addEventListener("click", () => {

            const value = card.dataset.temp;

            input.value = value;

            fromUnit.value = "C";
            updateInputSymbol();

            convert();
        });

    });


    /* COPY */

    copyBtn.addEventListener("click", async () => {

        const text =
            `${resultNumber.textContent}${resultUnit.textContent}`;

        try {

            await navigator.clipboard.writeText(text);

            showToast("Result copied successfully.");

        } catch {

            showToast("Copy failed.");

        }

    });


    /* HISTORY */

    function addHistory(inputValue, from, result, to) {

        const item = {
            input: inputValue,
            from,
            result,
            to,
            time: new Date().toLocaleString()
        };

        history.unshift(item);

        if (history.length > 20) {
            history.pop();
        }

        localStorage.setItem(
            "temperatureHistory",
            JSON.stringify(history)
        );

        renderHistory();
    }


    function renderHistory() {

        if (history.length === 0) {

            historyList.innerHTML = `
                <div class="empty-history">
                    No conversion history yet.
                </div>
            `;

            return;
        }

        historyList.innerHTML = history.map(item => {

            return `
                <div class="history-item">
                    <div>
                        <strong>
                            ${item.input}${getSymbol(item.from)}
                            →
                            ${item.result}${getSymbol(item.to)}
                        </strong>

                        <span>${item.time}</span>
                    </div>

                    <div class="history-result">
                        ${item.result}${getSymbol(item.to)}
                    </div>
                </div>
            `;

        }).join("");
    }


    clearHistoryBtn.addEventListener("click", () => {

        history = [];

        localStorage.removeItem("temperatureHistory");

        renderHistory();

        showToast("History cleared.");

    });


    /* THEME */

    const savedTheme = localStorage.getItem("temperatureTheme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");
        themeBtn.textContent = "☀";

    }


    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");

        localStorage.setItem(
            "temperatureTheme",
            dark ? "dark" : "light"
        );

        themeBtn.textContent =
            dark ? "☀" : "☾";

    });


    /* MOBILE MENU */

    const menuBtn = document.getElementById("menuBtn");

    menuBtn.addEventListener("click", () => {

        document
            .querySelector(".hero")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


    /* INITIAL */

    updateInputSymbol();
    renderHistory();

});
