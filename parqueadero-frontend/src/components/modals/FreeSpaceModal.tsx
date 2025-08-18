"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { espacioService } from "../../services/api"
import "./Modal.css"

interface FreeSpaceModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Espacio {
  idEspacio: number
  zona: string
  estado: string
}

const FreeSpaceModal: React.FC<FreeSpaceModalProps> = ({ isOpen, onClose }) => {
  const [inputValue, setInputValue] = useState("")
  const [spaces, setSpaces] = useState<Espacio[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadSpaces()
    }
  }, [isOpen])

  const loadSpaces = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await espacioService.getAll()
      if (response.success && response.data) {
        setSpaces(response.data)
      } else {
        setError("Error al cargar espacios")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar espacios")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const handleFreeSpace = async () => {
    if (!inputValue.trim()) {
      setError("Ingrese el ID del espacio a liberar")
      return
    }

    const spaceId = Number.parseInt(inputValue.trim())
    if (isNaN(spaceId)) {
      setError("El ID debe ser un número válido")
      return
    }

    const spaceExists = spaces.find((space) => space.idEspacio === spaceId)
    if (!spaceExists) {
      setError("No se encontró un espacio con ese ID")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await espacioService.free(spaceId)
      if (response.success) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          onClose()
          setInputValue("")
          loadSpaces()
        }, 1500)
      } else {
        setError("Error al liberar espacio")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al liberar espacio")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window free-space-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/window-icon.png" alt="Window" />
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <h2 className="modal-title orange-title">Liberar Espacio</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Espacio liberado exitosamente</div>}

          <div className="free-space-layout">
            <div className="space-icon">
              <img src="/storage-devices-icon.png" alt="Storage" />
            </div>

            <div className="free-space-form">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value)
                  if (error) setError(null)
                }}
                className="form-input"
                placeholder="Ingrese el ID del espacio"
                disabled={isLoading}
              />

              <div className="form-buttons">
                <button className="btn btn-primary" onClick={handleFreeSpace} disabled={isLoading}>
                  {isLoading ? "Liberando..." : "Liberar Espacio"}
                </button>
                <button className="btn btn-cancel" onClick={onClose} disabled={isLoading}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>

          <div className="space-table">
            {isLoading ? (
              <div className="loading-message">Cargando espacios...</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ZONA</th>
                  </tr>
                </thead>
                <tbody>
                  {spaces.map((space) => (
                    <tr key={space.idEspacio}>
                      <td>{space.idEspacio}</td>
                      <td>{space.zona}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FreeSpaceModal
