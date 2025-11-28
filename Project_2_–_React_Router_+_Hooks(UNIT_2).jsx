// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);



// src/App.jsx
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";
import About from "./pages/About";

function App() {
  return (
    <div>
      <h2>React Router & Hooks – Your Name (CS-A)</h2>
      <nav>
        <NavLink to="/">Home</NavLink> |{" "}
        <NavLink to="/students">Students</NavLink> |{" "}
        <NavLink to="/about">About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/students" element={<Students />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
