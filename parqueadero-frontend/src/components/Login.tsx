"use client"

import type React from "react"
import { useState } from "react"
import { authService } from "../services/api"
import "./Login.css"

interface LoginProps {
  onLogin: (username: string, password: string) => void
  onExit: () => void
}

const Login: React.FC<LoginProps> = ({ onLogin, onExit }) => {
  const [usuario, setUsuario] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await authService.login({ usuario, password })

      if (response.ok) {
        onLogin(usuario, password)
      } else {
        setError("Credenciales inválidas")
      }
    } catch (err) {
      setError("Error de conexión. Verifique que el servidor esté funcionando.")
      console.error("Login error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-overlay">
      <div className="login-window">
        <div className="login-header">
          <span className="login-title">🖥️ Acceso al Sistema</span>
          <div className="window-controls">
            <button className="window-control minimize">−</button>
            <button className="window-control maximize">□</button>
            <button className="window-control close" onClick={onExit}>
              ×
            </button>
          </div>
        </div>

        <div className="login-content">
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuario:</label>
              <input
                type="text"
                id="username"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="form-input"
                disabled={isLoading}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                disabled={isLoading}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-buttons">
              <button type="submit" className="btn-ingresar" disabled={isLoading}>
                {isLoading ? "⏳ Verificando..." : "🏠 Ingresar"}
              </button>
              <button type="button" className="btn-salir" onClick={onExit} disabled={isLoading}>
                🚪 Salir
              </button>
            </div>
          </form>

          <div className="login-icon">
            <div className="user-icon">👤</div>
            <div className="lock-icon">🔒</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
