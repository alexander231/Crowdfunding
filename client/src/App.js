import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./components/Home"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Startups from "./components/Startups"
import Raise from "./components/Raise"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/startups" element={<Startups />} />
        <Route path="/raise" element={<Raise />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
