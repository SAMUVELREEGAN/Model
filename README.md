# 🔐 MERN Authentication System

A full-stack authentication system built with **React (frontend)** and **Node.js/Express + MongoDB (backend)**.  
Supports **Register, Login, JWT Authentication, Forgot Password (Email), Reset Password, and Update Password**.

---
![React](https://img.shields.io/badge/React-17.0.2-blue?style=flat-square) 
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?style=flat-square) 
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.6-brightgreen?style=flat-square) 
![Express](https://img.shields.io/badge/Express-4.x-lightgrey?style=flat-square)

---

## ⚡ Features

### 🔧 Backend (Node.js + Express + MongoDB)
- User registration with **email validation**
- Secure password hashing using **bcrypt**
- JWT-based **access & refresh tokens**
- **Login / Logout**
- **Forgot password with email reset link**
- **Update password (old + new + confirm password)**
- Middleware for authentication & validation

### 🎨 Frontend (React)
- **Register, Login, Protected routes**
- **Forgot Password & Reset Password pages**
- **Update Password page** (for logged-in users)
- Handles backend error messages properly
- Uses **React Router v6** for navigation
- Token stored in **localStorage**

---

## 🛠 Tech Stack
- **Frontend:** React, Axios, React Router  
- **Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt  
- **Validation:** validator (for email & password)  
- **Email:** Nodemailer (for forgot password email links)

---
📸 Screenshots
**Without Login:**
<img width="1600" height="794" alt="1" src="https://github.com/user-attachments/assets/5896fd2a-7b86-43a9-8b55-313e081e2042" />

<img width="1600" height="772" alt="2" src="https://github.com/user-attachments/assets/86526f2c-6117-4f23-bfc3-ce791c186cf4" />

<img width="1600" height="782" alt="3" src="https://github.com/user-attachments/assets/3babe0c9-b7aa-41c0-ba20-4bf6e8db5709" />

<img width="1600" height="836" alt="4" src="https://github.com/user-attachments/assets/9288769e-edab-43ba-9125-9969bb96b9b0" />


**With Login:**

<img width="1600" height="794" alt="Git push error fix - Google Chrome 20-09-2025 06_35_17 PM" src="https://github.com/user-attachments/assets/17c7a6ec-d73e-4ed5-830b-3f127b37b027" />

<img width="1600" height="782" alt="Git push error fix - Google Chrome 20-09-2025 06_35_48 PM" src="https://github.com/user-attachments/assets/b6e1c691-0477-4136-b4ff-5ab095dad1fd" />

<img width="1600" height="785" alt="Git push error fix - Google Chrome 20-09-2025 06_36_04 PM" src="https://github.com/user-attachments/assets/f4e93ea9-da15-4728-b302-5c8b022efdff" />

<img width="1600" height="785" alt="Git push error fix - Google Chrome 20-09-2025 06_36_20 PM" src="https://github.com/user-attachments/assets/e73d5cf0-e5cd-4d7d-9269-33560b1a7adb" />

<img width="1600" height="785" alt="Git push error fix - Google Chrome 20-09-2025 06_36_36 PM" src="https://github.com/user-attachments/assets/603cb756-3c93-4abc-aec9-6b859f5f0b5e" />

<img width="1600" height="791" alt="Git push error fix - Google Chrome 20-09-2025 06_36_46 PM" src="https://github.com/user-attachments/assets/378933a0-798d-4bb7-99b2-e5dcea4cb4ff" />

<img width="1600" height="836" alt="http___localhost_8000_login - My Workspace 20-09-2025 06_39_26 PM" src="https://github.com/user-attachments/assets/43b8c66d-9fb1-4073-8ccb-dace35ae2dec" />

<img width="1600" height="836" alt="http___localhost_8000_login - My Workspace 20-09-2025 06_41_02 PM" src="https://github.com/user-attachments/assets/ea71ad96-b0d7-4603-abf9-a67d57c9f478" />

<img width="1600" height="800" alt="React App - Google Chrome 20-09-2025 06_43_00 PM" src="https://github.com/user-attachments/assets/104ea02f-eaed-4b39-a937-c6a47ebfa3ec" />


**With Login Token:**

<img width="1044" height="277" alt="1PNG" src="https://github.com/user-attachments/assets/b94c7bce-ea51-4fba-ac02-08292cbf8754" />

<img width="1051" height="226" alt="2" src="https://github.com/user-attachments/assets/68bc99c1-60d0-4bbb-b184-1ab78448e896" />


---


## 🚀 Installation

### 1️⃣ Clone the repo
```bash
git clone https://github.com/SAMUVELREEGAN/Model.git
cd Model
