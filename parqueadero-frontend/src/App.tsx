"use client"

import { useState } from "react"
import Dashboard from "./pages/Dashboard"
import Login from "./components/Login"
import "./App.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (username: string, password: string) => {
    // Simple authentication - in real app, validate against backend
    if (username && password) {
      setIsAuthenticated(true)
    } else {
      alert("Por favor ingrese usuario y contraseña")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const handleExit = () => {
    // In a real app, this would close the application
    window.close()
  }

  return (
    <div className="App">
      {isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} onExit={handleExit} />}
    </div>
  )
}

export default App
