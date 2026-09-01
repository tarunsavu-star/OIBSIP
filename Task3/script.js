/* =========================================================
   TEMPX — ADVANCED TEMPERATURE CONVERTER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
  ======================================================= */

  const temperatureInput =
    document.getElementById("temperatureInput");

  const fromUnit =
    document.getElementById("fromUnit");

  const toUnit =
    document.getElementById("toUnit");

  const resultValue =
    document.getElementById("resultValue");

  const resultText =
    document.getElementById("resultText");

  const swapButton =
    document.getElementById("swapButton");

  const clearInput =
    document.getElementById("clearInput");

  const copyButton =
    document.getElementById("copyButton");

  const statusIcon =
    document.getElementById("statusIcon");

  const statusTitle =
    document.getElementById("statusTitle");

  const statusDescription =
    document.getElementById("statusDescription");

  const historyList =
    document.getElementById("historyList");

  const historyCount =
    document.getElementById("historyCount");

  const clearHistory =
    document.getElementById("clearHistory");

  const themeToggle =
    document.getElementById("themeToggle");

  const menuToggle =
    document.getElementById("menuToggle");

  const navMenu =
    document.getElementById("navMenu");

  const toast =
    document.getElementById("toast");


  /* =======================================================
     UNIT SYMBOLS
  ======================================================= */

  const symbols = {

    celsius: "°C",

    fahrenheit: "°F",

    kelvin: "K"

  };


  /* =======================================================
     CONVERT TO CELSIUS
  ======================================================= */

  function toCelsius(value, unit) {

    if (unit === "celsius") {
      return value;
    }

    if (unit === "fahrenheit") {
      return (value - 32) * 5 / 9;
    }

    if (unit === "kelvin") {
      return value - 273.15;
    }

    return value;
  }


  /* =======================================================
     CONVERT FROM CELSIUS
  ======================================================= */

  function fromCelsius(value, unit) {

    if (unit === "celsius") {
      return value;
    }

    if (unit === "fahrenheit") {
      return (value * 9 / 5) + 32;
    }

    if (unit === "kelvin") {
      return value + 273.15;
    }

    return value;
  }


  /* =======================================================
     FORMAT NUMBER
  ======================================================= */

  function formatNumber(value) {

    if (!Number.isFinite(value)) {
      return "—";
    }

    if (Math.abs(value) < 0.000001) {
      value = 0;
    }

    return Number(value.toFixed(4)).toString();
  }


  /* =======================================================
     TEMPERATURE STATUS
  ======================================================= */

  function updateStatus(celsius) {

    if (!Number.isFinite(celsius)) {

      statusIcon.textContent = "🌡️";

      statusTitle.textContent =
        "Waiting for input";

      statusDescription.textContent =
        "Your temperature condition will appear here.";

      return;
    }


    if (celsius <= 0) {

      statusIcon.textContent = "❄️";

      statusTitle.textContent =
        "Freezing / Very Cold";

      statusDescription.textContent =
        "The temperature is at or below the freezing point of water.";

      return;
    }


    if (celsius < 15) {

      statusIcon.textContent = "🥶";

      statusTitle.textContent =
        "Cold";

      statusDescription.textContent =
        "This temperature can feel quite cold.";

      return;
    }


    if (celsius < 30) {

      statusIcon.textContent = "🌤️";

      statusTitle.textContent =
        "Comfortable";

      statusDescription.textContent =
        "This temperature is generally comfortable for many everyday situations.";

      return;
    }


    if (celsius < 40) {

      statusIcon.textContent = "☀️";

      statusTitle.textContent =
        "Warm / Hot";

      statusDescription.textContent =
        "The temperature is becoming noticeably warm.";

      return;
    }


    statusIcon.textContent = "🔥";

    statusTitle.textContent =
      "Very Hot";

    statusDescription.textContent =
      "This is a high temperature. Stay hydrated and take appropriate precautions.";

  }


  /* =======================================================
     CONVERSION
  ======================================================= */

  function convertTemperature(save = true) {

    const rawValue =
      temperatureInput.value.trim();

    if (rawValue === "") {

      resultValue.textContent = "—";

      resultText.textContent =
        "Enter a temperature to begin.";

      updateStatus(NaN);

      return;

    }


    const value =
      Number(rawValue);


    if (!Number.isFinite(value)) {

      resultValue.textContent = "Invalid";

      resultText.textContent =
        "Please enter a valid number.";

      updateStatus(NaN);

      return;

    }


    const celsius =
      toCelsius(value, fromUnit.value);


    /*
      Kelvin cannot be negative.
    */

    if (
      (fromUnit.value === "kelvin" && value < 0) ||
      celsius < -273.15
    ) {

      resultValue.textContent = "Invalid";

      resultText.textContent =
        "Temperature cannot be below absolute zero.";

      updateStatus(NaN);

      return;

    }


    const converted =
      fromCelsius(celsius, toUnit.value);


    const formatted =
      formatNumber(converted);


    const fromSymbol =
      symbols[fromUnit.value];

    const toSymbol =
      symbols[toUnit.value];


    resultValue.textContent =
      `${formatted} ${toSymbol}`;


    resultText.textContent =
      `${value} ${fromSymbol} = ${formatted} ${toSymbol}`;


    updateStatus(celsius);


    /*
      Update hero preview.
    */

    updateHero(celsius);


    /*
      Save conversion.
    */

    if (
      save &&
      fromUnit.value !== toUnit.value
    ) {

      saveHistory({

        input: value,

        output: converted,

        from: fromUnit.value,

        to: toUnit.value,

        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })

      });

    }

  }


  /* =======================================================
     HERO
  ======================================================= */

  function updateHero(celsius) {

    const heroTemperature =
      document.getElementById("heroTemperature");

    const heroFahrenheit =
      document.getElementById("heroFahrenheit");

    const heroKelvin =
      document.getElementById("heroKelvin");


    if (!heroTemperature) return;


    const fahrenheit =
      fromCelsius(celsius, "fahrenheit");

    const kelvin =
      fromCelsius(celsius, "kelvin");


    heroTemperature.textContent =
      formatNumber(celsius);

    heroFahrenheit.textContent =
      `${formatNumber(fahrenheit)} °F`;

    heroKelvin.textContent =
      `${formatNumber(kelvin)} K`;

  }


  /* =======================================================
     INPUT EVENTS
  ======================================================= */

  temperatureInput.addEventListener(
    "input",
    () => convertTemperature(false)
  );


  fromUnit.addEventListener(
    "change",
    () => convertTemperature(false)
  );


  toUnit.addEventListener(
    "change",
    () => convertTemperature(false)
  );


  /* =======================================================
     SWAP UNITS
  ======================================================= */

  swapButton.addEventListener("click", () => {

    const oldFrom =
      fromUnit.value;

    fromUnit.value =
      toUnit.value;

    toUnit.value =
      oldFrom;

    convertTemperature(false);

  });


  /* =======================================================
     CLEAR INPUT
  ======================================================= */

  clearInput.addEventListener("click", () => {

    temperatureInput.value = "";

    resultValue.textContent = "—";

    resultText.textContent =
      "Enter a temperature to begin.";

    updateStatus(NaN);

    temperatureInput.focus();

  });


  /* =======================================================
     COPY RESULT
  ======================================================= */

  copyButton.addEventListener("click", async () => {

    const result =
      resultValue.textContent;

    if (
      !result ||
      result === "—" ||
      result === "Invalid"
    ) {

      showToast("Nothing to copy.");

      return;

    }


    try {

      await navigator.clipboard.writeText(result);

      showToast("Result copied!");

    } catch {

      showToast("Copy failed.");

    }

  });


  /* =======================================================
     QUICK VALUES
  ======================================================= */

  document
    .querySelectorAll(".quick-btn")
    .forEach(button => {

      button.addEventListener("click", () => {

        const value =
          button.dataset.value;

        temperatureInput.value =
          value;

        fromUnit.value =
          "celsius";

        convertTemperature(true);

        document
          .getElementById("converter")
          .scrollIntoView({
            behavior: "smooth"
          });

      });

    });


  /* =======================================================
     HISTORY STORAGE
  ======================================================= */

  let history =
    JSON.parse(
      localStorage.getItem("tempx-history") || "[]"
    );


  function saveHistory(item) {

    history.unshift(item);

    /*
      Keep only the latest 15.
    */

    history =
      history.slice(0, 15);

    localStorage.setItem(
      "tempx-history",
      JSON.stringify(history)
    );

    renderHistory();

  }


  /* =======================================================
     RENDER HISTORY
  ======================================================= */

  function renderHistory() {

    if (!historyList) return;


    historyCount.textContent =
      `${history.length} ${
        history.length === 1
          ? "conversion"
          : "conversions"
      }`;


    if (history.length === 0) {

      historyList.innerHTML = `

        <div class="empty-history">

          <div>🧮</div>

          <h3>No conversions yet</h3>

          <p>
            Your recent conversions will appear here.
          </p>

        </div>

      `;

      return;

    }


    historyList.innerHTML =
      history
        .map((item, index) => {

          const fromSymbol =
            symbols[item.from];

          const toSymbol =
            symbols[item.to];


          return `

            <div class="history-item">

              <div>

                <div class="history-conversion">

                  ${item.input}
                  ${fromSymbol}

                  <span>→</span>

                  ${formatNumber(item.output)}
                  ${toSymbol}

                </div>

                <div class="history-time">
                  ${item.time}
                </div>

              </div>

              <button
                class="history-delete"
                data-index="${index}"
                title="Delete">
                ×
              </button>

            </div>

          `;

        })
        .join("");


    document
      .querySelectorAll(".history-delete")
      .forEach(button => {

        button.addEventListener("click", () => {

          const index =
            Number(button.dataset.index);

          history.splice(index, 1);

          localStorage.setItem(
            "tempx-history",
            JSON.stringify(history)
          );

          renderHistory();

        });

      });

  }


  /* =======================================================
     CLEAR HISTORY
  ======================================================= */

  clearHistory.addEventListener("click", () => {

    if (history.length === 0) {

      showToast("History is already empty.");

      return;

    }


    history = [];

    localStorage.removeItem("tempx-history");

    renderHistory();

    showToast("History cleared.");

  });


  /* =======================================================
     THEME
  ======================================================= */

  const savedTheme =
    localStorage.getItem("tempx-theme");


  if (savedTheme === "light") {

    document.body.classList.add("light");

    themeToggle.textContent = "☀️";

  }


  themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
      document.body.classList.contains("light");


    localStorage.setItem(
      "tempx-theme",
      isLight ? "light" : "dark"
    );


    themeToggle.textContent =
      isLight ? "☀️" : "🌙";

  });


  /* =======================================================
     MOBILE MENU
  ======================================================= */

  menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("show");

  });


  navMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        navMenu.classList.remove("show");

      });

    });


  document.addEventListener("click", event => {

    if (
      navMenu.classList.contains("show") &&
      !navMenu.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {

      navMenu.classList.remove("show");

    }

  });


  /* =======================================================
     TOAST
  ======================================================= */

  let toastTimer;


  function showToast(message) {

    toast.textContent =
      message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
      setTimeout(() => {

        toast.classList.remove("show");

      }, 2200);

  }


  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(".reveal");


  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {

    observer.observe(element);

  });


  /* =======================================================
     ACTIVE NAVIGATION
  ======================================================= */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll("nav a");


  window.addEventListener("scroll", () => {

    let current = "";


    sections.forEach(section => {

      const top =
        section.offsetTop - 130;


      if (window.scrollY >= top) {

        current =
          section.id;

      }

    });


    navLinks.forEach(link => {

      link.classList.remove("active");


      if (
        link.getAttribute("href") ===
        `#${current}`
      ) {

        link.classList.add("active");

      }

    });

  });


  /* =======================================================
     KEYBOARD SHORTCUT
  ======================================================= */

  temperatureInput.addEventListener(
    "keydown",
    event => {

      if (event.key === "Enter") {

        convertTemperature(true);

      }

    }
  );


  /* =======================================================
     INITIAL STATE
  ======================================================= */

  renderHistory();

  temperatureInput.value = "25";

  updateHero(25);

  convertTemperature(false);

});
