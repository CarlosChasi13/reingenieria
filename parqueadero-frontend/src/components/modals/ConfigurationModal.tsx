"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { configuracionService } from "../../services/api"
import "./Modal.css"

interface ConfigurationData {
  nombreEmpresa: string
  impuesto: string
  moneda: string
  simboloMoneda: string
  direccion: string
  ruc: string
  celular: string
  dimensionX: string
  dimensionY: string
  cantidadCerosBoleta: string
  cantidadCerosFactura: string
}

interface ConfigurationModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConfigurationModal: React.FC<ConfigurationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ConfigurationData>({
    nombreEmpresa: "",
    impuesto: "",
    moneda: "",
    simboloMoneda: "",
    direccion: "",
    ruc: "",
    celular: "",
    dimensionX: "",
    dimensionY: "",
    cantidadCerosBoleta: "",
    cantidadCerosFactura: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (isOpen) {
      loadConfiguration()
    }
  }, [isOpen])

  const loadConfiguration = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await configuracionService.get()
      if (response.success && response.data) {
        setFormData(response.data)
      } else {
        setError("Error al cargar la configuración")
      }
    } catch (err) {
      console.error("Error loading configuration:", err)
      setError("Error al cargar la configuración")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      setError("")
      setSuccess("")

      const response = await configuracionService.update(formData)
      if (response.success) {
        setSuccess("Configuración actualizada exitosamente")
        setTimeout(() => {
          setSuccess("")
          onClose()
        }, 2000)
      } else {
        setError("Error al actualizar la configuración")
      }
    } catch (err) {
      console.error("Error updating configuration:", err)
      setError("Error al actualizar la configuración")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setError("")
    setSuccess("")
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-window configuration-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/window-icon.png" alt="Window" />
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <h2 className="modal-title blue-title">Configuracion</h2>

          <div className="configuration-layout">
            <div className="configuration-icons">
              <div className="config-icon">
                <img src="/red-hand-truck-boxes.png" alt="Carretilla" />
              </div>
              <div className="config-icon">
                <img src="/colorful-abstract-collage.png" alt="Imagen colorida" />
                <button className="change-image-btn">Cambiar Imagen</button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="configuration-form">
              <div className="form-row">
                <label>Nombre de empresa</label>
                <input
                  type="text"
                  name="nombreEmpresa"
                  value={formData.nombreEmpresa}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <label>Impuesto</label>
                <input
                  type="text"
                  name="impuesto"
                  value={formData.impuesto}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <label>Moneda</label>
                <input
                  type="text"
                  name="moneda"
                  value={formData.moneda}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <label>Simbolo moneda</label>
                <input
                  type="text"
                  name="simboloMoneda"
                  value={formData.simboloMoneda}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <label>Ruc/Doc. fiscal</label>
                <input type="text" name="ruc" value={formData.ruc} onChange={handleInputChange} disabled={loading} />
              </div>

              <div className="form-row">
                <label>Celular</label>
                <input
                  type="text"
                  name="celular"
                  value={formData.celular}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <label>Direccion</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <label>Dimension x de la imagen</label>
                <input
                  type="text"
                  name="dimensionX"
                  value={formData.dimensionX}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <label>Dimension y de la imagen</label>
                <input
                  type="text"
                  name="dimensionY"
                  value={formData.dimensionY}
                  onChange={handleInputChange}
                  disabled={loading}
                />
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <div className="modal-buttons">
                <button type="button" onClick={handleCancel} className="btn btn-cancel" disabled={loading}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Actualizando..." : "Actualizar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfigurationModal
