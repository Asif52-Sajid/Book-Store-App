# 📚 Full-Stack Bookstore Application

A modern, full-stack Bookstore web application built with a **React (Vite)** frontend and a **Node.js & Express** backend, connected to a cloud **MongoDB Atlas** database.

---

## 🚀 Tech Stack

* **Frontend:** React, Vite, React Router, Context API, Axios, Tailwind CSS / Custom CSS
* **Backend:** Node.js, Express.js, Mongoose, bcryptjs, JSON Web Tokens (JWT), CORS, dotenv
* **Database:** MongoDB Atlas (Cloud NoSQL Database)
* **Deployment:** Render (Backend) & Vercel (Frontend)

---

## ⚙️ Local Development Setup

Follow these instructions to run the project locally on your machine.

### Prerequisites

- Node.js installed on your system
- MongoDB Atlas account or local MongoDB Compass instance

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-bookstore-repo.git
cd your-bookstore-repo
```

### 2. Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file inside the `backend` folder and add the following variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the backend development server:

   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file inside the `frontend` folder and add:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```