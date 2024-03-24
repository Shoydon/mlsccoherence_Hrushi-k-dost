import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Borrow from "./components/Borrow"
import Home from "./components/Home"
import Lending from "./components/Lending"
import Login from "./components/Login"
import Navbar from "./components/Navbar"
import Payments from "./components/Payments"
import Signin from "./components/Signin"

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
              <Route path="/borrow" element={<Borrow />} />{" "}
              <Route path="/lending" element={<Lending />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
