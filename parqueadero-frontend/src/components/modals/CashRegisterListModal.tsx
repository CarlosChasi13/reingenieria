"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { cajaService } from "../../services/api"
import "./Modal.css"

interface CashRegister {
  idCaja: number
  fechaApertura: string
  montoApertura: number
  fechaCierre?: string
  montoCierre?: number
  estado: string
}

interface CashRegisterListModalProps {
  isOpen: boolean
  onClose: () => void
}

const CashRegisterListModal: React.FC<CashRegisterListModalProps> = ({ isOpen, onClose }) => {
  const [cashRegisters, setCashRegisters] = useState<CashRegister[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      loadCashRegisters()
    }
  }, [isOpen])

  const loadCashRegisters = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await cajaService.getAll()
      if (response.success && response.data) {
        setCashRegisters(response.data)
      } else {
        setError("Error al cargar las cajas")
        setCashRegisters([])
      }
    } catch (error) {
      console.error("Error loading cash registers:", error)
      setError("Error de conexión al cargar las cajas")
      setCashRegisters([])
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-window cash-register-list-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/window-icon.png" alt="Window" />
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <h2 className="modal-title">Lista de cajas</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="cash-register-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>FECHA</th>
                  <th>MONTO</th>
                  <th>ESTADO</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={3} className="loading-cell">
                      Cargando...
                    </td>
                  </tr>
                ) : cashRegisters.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="empty-cell">
                      No hay registros de caja
                    </td>
                  </tr>
                ) : (
                  cashRegisters.map((register) => (
                    <tr key={register.idCaja}>
                      <td>{register.fechaApertura}</td>
                      <td>{register.montoApertura}</td>
                      <td>{register.estado}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CashRegisterListModal
