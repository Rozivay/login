import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import RegisterPage from "./components/RegisterPage";
import { selectUser } from "./userSlice";
import './App.css'; // Импортируйте CSS

function App() {
  const user = useSelector(selectUser);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={user ? <HomePage /> : <LoginPage />} />
          <Route path="/register" element={user ? <HomePage /> : <RegisterPage />} />
          <Route path="/homepage" element={user ? <HomePage /> : <LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
