import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/signin"
import Signup from "./pages/auth/signup"
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
