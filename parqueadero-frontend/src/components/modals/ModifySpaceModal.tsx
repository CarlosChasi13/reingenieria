"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { espacioService } from "../../services/api"
import "./Modal.css"

interface ModifySpaceModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Espacio {
  idEspacio: number
  zona: string
  estado: string
}

const ModifySpaceModal: React.FC<ModifySpaceModalProps> = ({ isOpen, onClose }) => {
  const [zona, setZona] = useState("")
  const [spaces, setSpaces] = useState<Espacio[]>([])
  const [selectedSpace, setSelectedSpace] = useState<Espacio | null>(null)
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

  const handleSpaceSelect = (space: Espacio) => {
    setSelectedSpace(space)
    setZona(space.zona)
  }

  const handleModify = async () => {
    if (!selectedSpace) {
      setError("Seleccione un espacio para modificar")
      return
    }

    if (!zona.trim()) {
      setError("La zona es requerida")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await espacioService.update(selectedSpace.idEspacio, {
        zona: zona.trim(),
        estado: selectedSpace.estado,
      })

      if (response.success) {
        setSuccess(true)
        setTimeout(() => {
          setSuccess(false)
          onClose()
          loadSpaces()
        }, 1500)
      } else {
        setError("Error al modificar espacio")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al modificar espacio")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window modify-space-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/window-icon.png" alt="Window" />
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <h2 className="modal-title orange-title">Modificar Espacio</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Espacio modificado exitosamente</div>}

          <div className="modify-space-layout">
            <div className="space-icon">
              <img src="/storage-devices-icon.png" alt="Storage" />
            </div>

            <div className="space-table-section">
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
                      <tr
                        key={space.idEspacio}
                        onClick={() => handleSpaceSelect(space)}
                        className={selectedSpace?.idEspacio === space.idEspacio ? "selected-row" : ""}
                      >
                        <td>{space.idEspacio}</td>
                        <td>{space.zona}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="space-form-section">
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
                  disabled={isLoading || !selectedSpace}
                  placeholder="Ingrese el nombre de la zona"
                />
              </div>

              <div className="modal-buttons">
                <button className="btn btn-primary" onClick={handleModify} disabled={isLoading || !selectedSpace}>
                  {isLoading ? "Modificando..." : "Modificar"}
                </button>
                <button className="btn btn-cancel" onClick={onClose} disabled={isLoading}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModifySpaceModal
