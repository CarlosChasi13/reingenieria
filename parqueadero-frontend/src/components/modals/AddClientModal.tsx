"use client"

import type React from "react"
import { useState } from "react"
import { clienteService } from "../../services/api"
import "./Modal.css"

interface AddClientModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    razonSocial: "",
    ruc: "",
    direccion: "",
    telefono: "",
    nombres: "",
    apellidos: "",
    correo: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError(null)
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
        console.log(formData);
      await clienteService.create(formData)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
        handleNew() // Clear form after successful creation
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar cliente")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNew = () => {
    setFormData({
      razonSocial: "",
      ruc: "",
      direccion: "",
      telefono: "",
      nombres: "",
      apellidos: "",
      correo: "",
    })
    setError(null)
    setSuccess(false)
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
            <h2 className="modal-title blue-title">Agregar Nuevo Cliente</h2>
            <div className="client-icon">
              <img src="/user-with-plus.png" alt="Add User" />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Cliente registrado exitosamente</div>}

          <div className="form-section">
            <h3>Datos personales de Cliente</h3>
            <div className="form-grid">
              <div className="form-row">
                <label>Razón social</label>
                <input
                  type="text"
                  name="razonSocial"
                  value={formData.razonSocial}
                  onChange={handleInputChange}
                  className="form-input wide-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-row">
                <label>RUC</label>
                <input
                  type="text"
                  name="ruc"
                  value={formData.ruc}
                  onChange={handleInputChange}
                  className="form-input medium-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-row">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  className="form-input wide-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-row">
                <label>Teléfono/celular</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="form-input medium-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-row">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombres}
                  onChange={handleInputChange}
                  className="form-input medium-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-row">
                <label>Apellidos</label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleInputChange}
                  className="form-input small-input"
                  disabled={isLoading}
                />
              </div>

              <div className="form-row">
                <label>Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className="form-input wide-input"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="modal-buttons">
            <button className="btn btn-cyan" onClick={handleNew} disabled={isLoading}>
              Nuevo
            </button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={isLoading}>
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

export default AddClientModal
