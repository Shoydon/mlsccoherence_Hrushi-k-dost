import { Routes } from "react-router"
import { BrowserRouter, Route } from "react-router-dom"
import Home from "./components/Home"
import Login from "./components/Login"
import Payments from "./components/Payments"
import Signin from "./components/Signin"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/payments" element={<Payments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<Signin />} />
        <Route index element={<Home />} />
        <Route />
      </Routes>
    </BrowserRouter>
  )
}

export default App
