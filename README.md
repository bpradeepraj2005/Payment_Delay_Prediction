# 💳 Payment Delay Prediction (Default Risk)

An end-to-end Machine Learning project to predict whether a credit card customer will **default / delay payment next month** using historical billing and repayment data.

This project includes:
- ✅ Data preprocessing
- ✅ ML model training + Hyperparameter Tuning (GridSearchCV)
- ✅ FastAPI backend for predictions
- ✅ Professional Web UI (HTML + CSS + JavaScript)
- ✅ Deployed as a live web application

---

## 🚀 Live Demo
🔗 **Live Website:** `PASTE_YOUR_RENDER_LINK_HERE`  
📘 **API Docs (Swagger):** `PASTE_YOUR_RENDER_LINK_HERE/docs`

---

## 📌 Problem Statement
Predict the probability of **default payment next month** for a customer based on:
- Credit limit
- Demographics (age, education, marriage, gender)
- Past payment delays (PAY_0 to PAY_6)
- Bill amounts (BILL_AMT1 to BILL_AMT6)
- Payment amounts (PAY_AMT1 to PAY_AMT6)

---

## 📊 Dataset
- **Dataset Name:** Default of Credit Card Clients
- **Source:** UCI Machine Learning Repository
- **Target Column:** `default payment next month`
  - `0` → Not Default
  - `1` → Default

---

## 🧠 Model Used
- **Algorithm:** Random Forest Classifier
- **Hyperparameter Tuning:** GridSearchCV
- **Evaluation Metric:** Accuracy (and probability score output)

---

## ✅ Features
- Clean UI with a real website look
- Interactive input form
- Default risk prediction + probability score
- Risk meter visualization
- Bill vs Payment chart (last 6 months)
- API accessible via `/predict`

---

## 🛠️ Tech Stack
**Backend**
- FastAPI
- Uvicorn
- Joblib
- Scikit-learn
- NumPy

**Frontend**
- HTML
- CSS
- JavaScript
- Chart.js

**Deployment**
- Render

---

## Architecture
 ┌─────────────────────────────┐
 │         User / Client        │
 │   (Laptop / Mobile Browser)  │
 └───────────────┬─────────────┘
                 │
                 │  UI Input (Form)
                 ▼
 ┌─────────────────────────────┐
 │   Web UI (HTML + CSS + JS)   │
 │  - Input Fields              │
 │  - Predict Button            │
 │  - Risk Meter + Chart.js     │
 └───────────────┬─────────────┘
                 │
                 │  POST Request (JSON)
                 ▼
 ┌─────────────────────────────┐
 │       FastAPI Backend        │
 │  - / (Webpage)               │
 │  - /predict (API endpoint)   │
 │  - Validation (Pydantic)     │
 └───────────────┬─────────────┘
                 │
                 │  Load Model + Predict
                 ▼
 ┌─────────────────────────────┐
 │   ML Model (best_model.pkl)  │
 │ RandomForest + GridSearchCV  │
 └───────────────┬─────────────┘
                 │
                 │  Prediction + Probability
                 ▼
 ┌─────────────────────────────┐
 │      JSON Response Output    │
 │  - prediction (0/1)          │
 │  - risk_probability          │
 │  - meaning                   │
 └───────────────┬─────────────┘
                 │
                 ▼
 ┌─────────────────────────────┐
 │ UI shows result + chart      │
 └─────────────────────────────┘


## 📂 Project Structure
```bash
pred/
├── app.py
├── requirements.txt
├── model/
│   └── best_model.pkl
├── templates/
│   └── index.html
└── static/
    ├── style.css
    ├── script.js
    └── favicon.ico
