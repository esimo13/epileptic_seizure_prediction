# 🧠 Epileptic Seizure Prediction App

A full-stack web application that predicts epileptic seizure states (Interictal, Preictal, Ictal) from EEG signals using a trained machine learning model. Designed for early warning and monitoring, combining AI and intuitive UX.

---

## 📋 Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Live Demo](#live-demo)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features

- EEG-based seizure state prediction
- Output states: `Interictal`, `Preictal` (with severity level), and `Ictal`
- Real-time input and results
- ML-powered backend (Flask)
- Modern and responsive frontend (Next.js + Tailwind CSS)
- Clean API integration between frontend and backend

---

## 🖼️ Screenshots

![Prediction Screenshot](./assets/screenshot.png)  
*Real-time seizure state prediction interface.*

---

## 🛠️ Tech Stack

### Frontend:
- **Next.js** (React)
- **Tailwind CSS**

### Backend:
- **Flask (Python)**
- **Scikit-learn / joblib (.pkl ML model)**
- **EEG data preprocessing**

### Deployment:
-  **Render/Netlify**

---

## 🧑‍💻 Getting Started

### Clone the Repository
```bash
git clone https://github.com/yourusername/seizure-predictor.git
cd seizure-predictor




create a folder 
open the folder in vscode
open a terminal
git clone https://github.com/esimo13/epileptic_seizure_prediction.git
cd backend
pip install -r requirements.txt
python app.py
open another terminal
cd eeg-seizure-prediction
npm i
npm run dev
