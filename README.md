# Dev Tinder

- Created a Vite + React Application

# Web Design :-

## UI & Styling

- **Library Used**: DaisyUI
- **CSS Framework**: Tailwind CSS
- **Install Tailwind**: `npm install tailwindcss @tailwindcss/vite`
- **Install DaisyUI**: `npm install -D daisyui@latest`

## HTTP Client & Routing

- **Install Axios**: `npm install axios`
- **Install React Router**: `npm install react-router-dom`

## State Management

- **Install Redux Toolkit & React Redux**: `npm install @reduxjs/toolkit react-redux redux`

## Backend Middleware

- **Install CORS Middleware (Backend)**: Refer to https://expressjs.com/en/resources/middleware/cors/

## Build Tool

- **Build Tool**: Vite (Pre-configured)

## Development Tools

- **ESLint**: For code linting
- **React Plugins**: Vite React plugin for development

# Routing in this Project (React Rounter)

1. Install React Router using npm i react-router-dom
2. Create and test routing.

- Routing Component Design

# API Calls

1. Install axios to call the API using npm i axios
2.

# Knowledge COncepts

1. While creating the Children Route we need use the <Outlet/> in the parent component so that the childrens can render inside them.
2. CORS Error:- When a request from different domain request the sserver working on some other domain then in that case we get cors error. Even the port number should be same.
   In this case we need to use the cors package in the backend application using https://expressjs.com/en/resources/middleware/cors/
   and simply use as the middle ware in the app.js.
   We need to whitelist the domain name in the backend.
   app.use(
   cors({
   origin: "http://localhost:5173", // Replace with your frontend URL
   credentials: true, // Allow cookies to be sent in cross-origin requests
   }),
   );

- Also when using the axios we need to pass the axios
- const res = await axios.post(
  "http://localhost:3000/login",
  {
  emailId,
  password,
  },
  {
  withCredentials: true,
  },
  );

- So basically to set the cookies we need to do following
  - Configurtion in the cors midleaware as mentioned above
  - Then allow the withCredentials in the axios in the frontend application.
    If we dont do this then token will not be send with the api calls.
