"use client"

import type React from "react"
import { useState } from "react"
import { authService } from "../../services/api"
import "./Modal.css"

interface AddUserModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    usuario: "",
    password: "",
    tipo: "Administrador",
    nombres: "",
    apellidos: "",
    dni: "",
    telefono: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError(null)
  }

  const handleNuevo = () => {
    setFormData({
      usuario: "",
      password: "",
      tipo: "Administrador",
      nombres: "",
      apellidos: "",
      dni: "",
      telefono: "",
    })
    setError(null)
    setSuccess(false)
  }

  const handleRegistrar = async () => {
    // Validation
    if (!formData.usuario.trim()) {
      setError("El usuario es requerido")
      return
    }
    if (!formData.password.trim()) {
      setError("La contraseña es requerida")
      return
    }
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }
    if (!formData.nombres.trim()) {
      setError("El nombre es requerido")
      return
    }
    if (!formData.apellidos.trim()) {
      setError("El apellido es requerido")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await authService.createUser(formData)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
        handleNuevo()
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear usuario")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window add-client-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/window-icon.png" alt="Window" />
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <div className="modal-title-section">
            <h2 className="modal-title blue-title">Agregar Nuevo Usuario</h2>
            <div className="client-icon">
              <img src="/user-icon-plus.png" alt="Add User" />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Usuario creado exitosamente</div>}

          <div className="form-grid">
            <div className="form-row">
              <label>Usuario</label>
              <input
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleInputChange}
                className="form-input wide-input"
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input wide-input"
                disabled={isLoading}
                placeholder="••••••••••••"
              />
            </div>

            <div className="form-row">
              <label>Tipo</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleInputChange}
                className="form-input medium-input"
                disabled={isLoading}
              >
                <option value="Administrador">Administrador</option>
                <option value="Usuario">Usuario</option>
                <option value="Operador">Operador</option>
              </select>
            </div>

            <div className="form-row">
              <label>Nombre</label>
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleInputChange}
                className="form-input wide-input"
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <label>Apellido</label>
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleInputChange}
                className="form-input wide-input"
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <label>Dni</label>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                className="form-input wide-input"
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <label>Telefono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="form-input wide-input"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="modal-buttons">
            <button className="btn btn-cyan" onClick={handleNuevo} disabled={isLoading}>
              Nuevo
            </button>
            <button className="btn btn-primary" onClick={handleRegistrar} disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar"}
            </button>
            <button className="btn btn-cancel" onClick={onClose} disabled={isLoading}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUserModal
