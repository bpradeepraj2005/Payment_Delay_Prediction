// ------------------- DOM ELEMENTS -------------------
const form = document.getElementById("predictForm");
const predictBtn = document.getElementById("predictBtn");

const badge = document.getElementById("badge");
const riskText = document.getElementById("riskText");
const meterFill = document.getElementById("meterFill");
const predText = document.getElementById("predText");
const meaningText = document.getElementById("meaningText");
const rawJson = document.getElementById("rawJson");

const copyBtn = document.getElementById("copyBtn");
const sampleBtn = document.getElementById("sampleBtn");
const resetBtn = document.getElementById("resetBtn");

// Slider IDs
const sliderIds = ["PAY_0", "PAY_2", "PAY_3", "PAY_4", "PAY_5", "PAY_6"];

// ------------------- HELPERS -------------------
function getValue(id) {
  return document.getElementById(id).value;
}

function setValue(id, val) {
  document.getElementById(id).value = val;
  const pill = document.getElementById(id + "_val");
  if (pill) pill.innerText = val;
}

function setBadge(type, text) {
  badge.className = "badge " + type;
  badge.innerText = text;
}

function setLoading(isLoading) {
  predictBtn.disabled = isLoading;
  predictBtn.innerText = isLoading ? "Predicting..." : "Predict";
}

// ------------------- SLIDER VALUE PILLS -------------------
sliderIds.forEach((id) => {
  const slider = document.getElementById(id);
  const pill = document.getElementById(id + "_val");

  const update = () => {
    if (pill) pill.innerText = slider.value;
  };

  slider.addEventListener("input", update);
  update();
});

// ------------------- CHART.JS SETUP -------------------
const chartCanvas = document.getElementById("billPayChart");

const monthLabels = [
  "Month 1",
  "Month 2",
  "Month 3",
  "Month 4",
  "Month 5",
  "Month 6",
];

let billPayChart = new Chart(chartCanvas, {
  type: "line",
  data: {
    labels: monthLabels,
    datasets: [
      {
        label: "Bills",
        data: [0, 0, 0, 0, 0, 0],
        tension: 0.3,
      },
      {
        label: "Payments",
        data: [0, 0, 0, 0, 0, 0],
        tension: 0.3,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
      },
      y: {
        ticks: { color: "white" },
      },
    },
  },
});

function updateChart() {
  const bills = [
    parseFloat(getValue("BILL_AMT1")),
    parseFloat(getValue("BILL_AMT2")),
    parseFloat(getValue("BILL_AMT3")),
    parseFloat(getValue("BILL_AMT4")),
    parseFloat(getValue("BILL_AMT5")),
    parseFloat(getValue("BILL_AMT6")),
  ];

  const pays = [
    parseFloat(getValue("PAY_AMT1")),
    parseFloat(getValue("PAY_AMT2")),
    parseFloat(getValue("PAY_AMT3")),
    parseFloat(getValue("PAY_AMT4")),
    parseFloat(getValue("PAY_AMT5")),
    parseFloat(getValue("PAY_AMT6")),
  ];

  billPayChart.data.datasets[0].data = bills;
  billPayChart.data.datasets[1].data = pays;
  billPayChart.update();
}

// ------------------- COPY BUTTON -------------------
copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(rawJson.innerText);
    copyBtn.innerText = "Copied!";
    setTimeout(() => (copyBtn.innerText = "Copy"), 1200);
  } catch (e) {
    alert("Copy failed ❌");
  }
});

// ------------------- SAMPLE BUTTON -------------------
sampleBtn.addEventListener("click", () => {
  setValue("LIMIT_BAL", 20000);
  setValue("AGE", 24);
  setValue("SEX", 2);
  setValue("EDUCATION", 2);
  setValue("MARRIAGE", 1);

  setValue("PAY_0", 2);
  setValue("PAY_2", 2);
  setValue("PAY_3", 0);
  setValue("PAY_4", 0);
  setValue("PAY_5", 0);
  setValue("PAY_6", 0);

  setValue("BILL_AMT1", 3913);
  setValue("BILL_AMT2", 3102);
  setValue("BILL_AMT3", 689);
  setValue("BILL_AMT4", 0);
  setValue("BILL_AMT5", 0);
  setValue("BILL_AMT6", 0);

  setValue("PAY_AMT1", 0);
  setValue("PAY_AMT2", 689);
  setValue("PAY_AMT3", 0);
  setValue("PAY_AMT4", 0);
  setValue("PAY_AMT5", 0);
  setValue("PAY_AMT6", 0);

  updateChart();
  setBadge("neutral", "Sample loaded. Click Predict 🚀");
});

// ------------------- RESET BUTTON -------------------
resetBtn.addEventListener("click", () => {
  form.reset();

  // update pills after reset
  sliderIds.forEach((id) => {
    const slider = document.getElementById(id);
    const pill = document.getElementById(id + "_val");
    if (pill) pill.innerText = slider.value;
  });

  meterFill.style.width = "0%";
  riskText.innerText = "0.0000";
  predText.innerText = "-";
  meaningText.innerText = "-";
  rawJson.innerText = "{ }";

  updateChart();
  setBadge("neutral", "Waiting for input…");
});

// ------------------- FORM SUBMIT (PREDICT) -------------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  setLoading(true);
  setBadge("neutral", "Predicting...");

  const payload = {
    LIMIT_BAL: parseFloat(getValue("LIMIT_BAL")),
    SEX: parseInt(getValue("SEX")),
    EDUCATION: parseInt(getValue("EDUCATION")),
    MARRIAGE: parseInt(getValue("MARRIAGE")),
    AGE: parseInt(getValue("AGE")),

    PAY_0: parseInt(getValue("PAY_0")),
    PAY_2: parseInt(getValue("PAY_2")),
    PAY_3: parseInt(getValue("PAY_3")),
    PAY_4: parseInt(getValue("PAY_4")),
    PAY_5: parseInt(getValue("PAY_5")),
    PAY_6: parseInt(getValue("PAY_6")),

    BILL_AMT1: parseFloat(getValue("BILL_AMT1")),
    BILL_AMT2: parseFloat(getValue("BILL_AMT2")),
    BILL_AMT3: parseFloat(getValue("BILL_AMT3")),
    BILL_AMT4: parseFloat(getValue("BILL_AMT4")),
    BILL_AMT5: parseFloat(getValue("BILL_AMT5")),
    BILL_AMT6: parseFloat(getValue("BILL_AMT6")),

    PAY_AMT1: parseFloat(getValue("PAY_AMT1")),
    PAY_AMT2: parseFloat(getValue("PAY_AMT2")),
    PAY_AMT3: parseFloat(getValue("PAY_AMT3")),
    PAY_AMT4: parseFloat(getValue("PAY_AMT4")),
    PAY_AMT5: parseFloat(getValue("PAY_AMT5")),
    PAY_AMT6: parseFloat(getValue("PAY_AMT6")),
  };

  try {
    const res = await fetch("/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    rawJson.innerText = JSON.stringify(data, null, 2);

    const risk = data.risk_probability ?? 0;
    const riskPercent = Math.round(risk * 100);

    riskText.innerText = risk.toFixed(4);
    meterFill.style.width = `${riskPercent}%`;

    predText.innerText = data.prediction;
    meaningText.innerText = data.meaning;

    if (data.prediction === 1) {
      setBadge("bad", `⚠️ High Risk (${riskPercent}%) - Default Likely`);
    } else {
      setBadge("good", `✅ Low Risk (${riskPercent}%) - Not Default`);
    }

    updateChart();
  } catch (err) {
    setBadge("bad", "API Error: Could not connect ❌");
  } finally {
    setLoading(false);
  }
});

// Initial chart render
updateChart();
