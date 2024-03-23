import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Payments from "./components/Payments";
import Login from "./components/Login";
import Signin from "./components/Signin";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <BrowserRouter>
      <div>
      <Navbar />
      </div>
       
        <div className="content-container">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/payments" element={<Payments />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
