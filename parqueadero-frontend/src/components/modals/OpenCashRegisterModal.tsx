"use client"

import type React from "react"
import { useState } from "react"
import { cajaService } from "../../services/api"
import "./Modal.css"

interface OpenCashRegisterModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenCashRegister: (amount: number) => void
}

const OpenCashRegisterModal: React.FC<OpenCashRegisterModalProps> = ({ isOpen, onClose, onOpenCashRegister }) => {
  const [amount, setAmount] = useState("0")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const numericAmount = Number.parseFloat(amount) || 0
      const response = await cajaService.open(numericAmount)

      if (response.success) {
        onOpenCashRegister(numericAmount)
        onClose()
        setAmount("0")
      } else {
        setError("Error al abrir la caja")
      }
    } catch (error) {
      console.error("Error opening cash register:", error)
      setError("Error de conexión al abrir la caja")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setAmount("0")
    setError(null)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window open-cash-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/window-icon.png" alt="Window" />
          </div>
          <button className="modal-close" onClick={handleCancel}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <h2 className="modal-title blue-title">Abrir Caja</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="open-cash-content">
            <div className="cash-icon">
              <img src="/red-hand-truck-boxes.png" alt="Cash register" />
            </div>

            <form onSubmit={handleSubmit} className="open-cash-form">
              <div className="form-group">
                <label htmlFor="amount">Ingrese monto de apertura de caja</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                  disabled={isLoading}
                  className="form-input"
                />
              </div>

              <div className="modal-buttons">
                <button type="button" className="btn btn-cancel" onClick={handleCancel} disabled={isLoading}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? "Abriendo..." : "Abrir caja"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpenCashRegisterModal
