# DevAI 🤖💬

An intelligent, conversational AI chatbot built with the **MERN Stack** (MongoDB, Express.js, React, Node.js), powered by **Google Gemini API**, and secured with **Firebase Authentication**.

DevAI provides developers and users with instant answers, code generation, debugging help, and seamless chat conversations through a modern and responsive user interface.

## ✨ Live Demo

Experience the live application here:

👉 [**https://devmynt-ai-vone.vercel.app**](https://devmynt-ai-vone.vercel.app)

## 🚀 Features

* **Google Gemini Integration**: Fast, high-accuracy conversational AI capabilities for answering technical queries and generating code.

* **Secure Authentication**: User signup, login, and OAuth verification managed seamlessly via Firebase Authentication.

* **Conversation History**: Chat sessions and conversation history persisted with MongoDB.

* **Modern Responsive UI**: Clean, intuitive, and mobile-friendly interface designed for rapid developer interactions.

* **RESTful API Architecture**: Modular Node.js and Express backend handling prompt processing, session data, and secure credential management.

## 🛠️ Technologies Used

### Frontend

* **React.js** (Vite / CRA)

* **Firebase SDK** (Client-side authentication & OAuth)

* **Tailwind CSS / CSS3** (Styling & layout)

* **Axios** (API requests)

### Backend

* **Node.js** & **Express.js** (Server runtime & REST API)

* **Google Generative AI SDK** (`@google/generative-ai` / Gemini API)

* **Mongoose** (MongoDB object modeling)

* **Cors & Dotenv** (Middleware & environment configuration)

### Database & Services

* **MongoDB Atlas** (Cloud NoSQL database)

* **Firebase Auth** (Identity provider)

### Deployment

* **Frontend**: [Vercel](https://vercel.com)

* **Backend**: [Render](https://render.com)

## 📂 Project Structure

```
DevAI/
├── backend/
│   ├── config/          # Database and Firebase configurations
│   ├── controllers/     # Route logic (Chat, User, Gemini handler)
│   ├── models/          # Mongoose database schemas
│   ├── routes/          # Express route definitions
│   ├── .env.example     # Backend environment template
│   ├── package.json
│   └── server.js        # Main server entrypoint
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/  # Chat window, sidebar, message bubbles
    │   ├── context/     # Auth and state management
    │   ├── firebase/    # Firebase client initialization
    │   ├── services/    # API calling functions
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example     # Frontend environment template
    ├── package.json
    └── vite.config.js

```

## ⚙️ Getting Started (Local Development)

### 1. Clone the Repository

```
git clone https://github.com/theahmed619/DevAI.git
cd DevAI

```

### 2. Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   
   ```

2. Install dependencies:

   ```
   npm install
   
   ```

3. Create a `.env` file based on `.env.example`:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   CLIENT_URL=http://localhost:5173
   
   ```

4. Start the backend development server:

   ```
   npm run dev
   # or
   npm start
   
   ```

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:

   ```
   cd frontend
   
   ```

2. Install dependencies:

   ```
   npm install
   
   ```

3. Create a `.env` file based on `.env.example`:

   ```
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_BACKEND_URL=http://localhost:5000
   
   ```

4. Start the frontend development server:

   ```
   npm run dev
   
   ```

5. Open your browser and visit `http://localhost:5173`.

## 🔒 Environment Variables Summary

| **Scope** | **Variable** | **Purpose** | 
| **Backend** | `PORT` | Local port number (e.g. `5000`) | 
| **Backend** | `MONGO_URI` | MongoDB Atlas database connection URI | 
| **Backend** | `GEMINI_API_KEY` | Google AI Studio Gemini API Key | 
| **Backend** | `CLIENT_URL` | Frontend origin for CORS policy | 
| **Frontend** | `VITE_BACKEND_URL` | Backend base API URL | 
| **Frontend** | `VITE_FIREBASE_*` | Firebase project credentials | 

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/theahmed619/DevAI/issues).

1. Fork the Project

2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)

3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)

4. Push to the Branch (`git push origin feature/AmazingFeature`)

5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE).
