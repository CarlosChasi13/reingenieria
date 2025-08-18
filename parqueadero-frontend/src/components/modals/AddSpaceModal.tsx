"use client"

import type React from "react"
import { useState } from "react"
import { espacioService } from "../../services/api"
import "./Modal.css"

interface AddSpaceModalProps {
  isOpen: boolean
  onClose: () => void
}

const AddSpaceModal: React.FC<AddSpaceModalProps> = ({ isOpen, onClose }) => {
  const [zona, setZona] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleRegister = async () => {
    if (!zona.trim()) {
      setError("La zona es requerida")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await espacioService.create({
        zona: zona.trim(),
        estado: "disponible",
      })

      if (response.success) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          onClose()
          handleNew()
        }, 1500)
      } else {
        setError("Error al registrar espacio")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al registrar espacio")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNew = () => {
    setZona("")
    setError(null)
    setSuccess(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window add-space-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/window-icon.png" alt="Window" />
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <h2 className="modal-title blue-title">Nueva espacio</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Espacio registrado exitosamente</div>}

          <div className="space-layout">
            <div className="space-icon">
              <img src="/storage-devices-icon.png" alt="Storage" />
            </div>

            <div className="space-form">
              <div className="form-row">
                <label>Zona</label>
                <input
                  type="text"
                  value={zona}
                  onChange={(e) => {
                    setZona(e.target.value)
                    if (error) setError(null)
                  }}
                  className="form-input"
                  disabled={isLoading}
                  placeholder="Ingrese el nombre de la zona"
                />
              </div>
            </div>
          </div>

          <div className="modal-buttons">
            <button className="btn btn-cancel" onClick={onClose} disabled={isLoading}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleRegister} disabled={isLoading}>
              {isLoading ? "Registrando..." : "Registrar"}
            </button>
            <button className="btn btn-cyan" onClick={handleNew} disabled={isLoading}>
              Nuevo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddSpaceModal
