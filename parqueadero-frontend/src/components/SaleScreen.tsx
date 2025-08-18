"use client"

import type React from "react"
import { useState } from "react"
import "./SalesScreen.css"

interface SalesScreenProps {
  isOpen: boolean
  cashAmount: number
  onCloseCashRegister: () => void
  onOpenClientModal: (modalType: string) => void
}

const SalesScreen: React.FC<SalesScreenProps> = ({ isOpen, cashAmount, onCloseCashRegister, onOpenClientModal }) => {
  const [clientCode, setClientCode] = useState("")
  const [nombres, setNombres] = useState("")
  const [apellidos, setApellidos] = useState("")
  const [direccion, setDireccion] = useState("")
  const [ruc, setRuc] = useState("")
  const [razonSocial, setRazonSocial] = useState("")
  const [numero, setNumero] = useState("")
  const [zona, setZona] = useState("")
  const [totalPagar, setTotalPagar] = useState("0")

  if (!isOpen) return null

  const getCurrentDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0].replace(/-/g, "/")
  }

  const handleClientExists = () => {
    onOpenClientModal("consult-client")
  }

  const handleRegisterClient = () => {
    onOpenClientModal("add-client")
  }

  const handleSelectSpace = () => {
    // TODO: Implement space selection modal
    console.log("Select space clicked")
  }

  const handleCloseCash = () => {
    if (window.confirm("¿Está seguro que desea cerrar la caja?")) {
      onCloseCashRegister()
    }
  }

  const handleNew = () => {
    // Clear all fields
    setClientCode("")
    setNombres("")
    setApellidos("")
    setDireccion("")
    setRuc("")
    setRazonSocial("")
    setNumero("")
    setZona("")
    setTotalPagar("0")
  }

  const handleBoleta = () => {
    // TODO: Implement boleta generation
    console.log("Generate boleta")
  }

  return (
    <div className="sales-screen">
      <div className="sales-header">
        <h1>Registro de Venta</h1>
        <div className="cash-balance">
          <span>Saldo caja</span>
          <span className="balance-amount">{cashAmount}</span>
        </div>
      </div>

      <div className="sales-content">
        <div className="sales-left-section">
          <div className="storage-icon">
            <img src="/storage-devices-icon.png" alt="Storage devices" />
          </div>
        </div>

        <div className="sales-main-section">
          <div className="client-section">
            <h3>Datos personales de Cliente</h3>
            <div className="client-actions">
              <button className="btn-secondary" onClick={handleClientExists}>
                cliente existente ?
              </button>
              <button className="btn-secondary" onClick={handleRegisterClient}>
                Registrar cliente
              </button>
              <button className="btn-close-cash" onClick={handleCloseCash}>
                Cerrar caja
              </button>
            </div>

            <div className="client-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Cod_Cliente</label>
                  <input type="text" value={clientCode} onChange={(e) => setClientCode(e.target.value)} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nombres</label>
                  <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Apellidos</label>
                  <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Dirección</label>
                  <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>RUC</label>
                  <input type="text" value={ruc} onChange={(e) => setRuc(e.target.value)} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label>Razón social</label>
                  <input type="text" value={razonSocial} onChange={(e) => setRazonSocial(e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-section">
            <div className="space-header">
              <h3>Id-Mesa</h3>
              <button className="btn-secondary" onClick={handleSelectSpace}>
                Seleccionar espacio
              </button>
            </div>

            <div className="space-form">
              <div className="space-fields">
                <div className="form-group">
                  <label>Numero</label>
                  <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>zona</label>
                  <input type="text" value={zona} onChange={(e) => setZona(e.target.value)} />
                </div>
                <div className="space-icon">
                  <span>🏢</span>
                </div>
                <div className="date-display">{getCurrentDate()}</div>
              </div>
            </div>
          </div>

          <div className="total-section">
            <div className="total-group">
              <label>Totals a Pagar S/.</label>
              <input
                type="number"
                value={totalPagar}
                onChange={(e) => setTotalPagar(e.target.value)}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="sales-footer">
        <div className="footer-actions">
          <button className="btn-cancel" onClick={handleCloseCash}>
            Cerrar
          </button>
          <button className="btn-secondary" onClick={handleNew}>
            Nuevo
          </button>
          <button className="btn-primary" onClick={handleBoleta}>
            Boleta
          </button>
        </div>
      </div>
    </div>
  )
}

export default SalesScreen
