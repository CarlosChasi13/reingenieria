"use client"

import type React from "react"
import { useState } from "react"
import "./Modal.css"

interface ConsultaSalesModalProps {
  isOpen: boolean
  onClose: () => void
}

const ConsultaSalesModal: React.FC<ConsultaSalesModalProps> = ({ isOpen, onClose }) => {
  const [searchBy, setSearchBy] = useState("cliente")
  const [searchValue, setSearchValue] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])

  if (!isOpen) return null

  const handleSearch = () => {
    // TODO: Implement search logic
    console.log(`Searching by ${searchBy}: ${searchValue}`)
  }

  const handleShowAll = () => {
    // TODO: Implement show all logic
    console.log("Showing all sales")
  }

  const handleViewDetail = () => {
    // TODO: Implement view detail logic
    console.log("Viewing sale detail")
  }

  const handlePrint = () => {
    // TODO: Implement print logic
    console.log("Printing sales report")
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window large-modal">
        <div className="modal-header">
          <div className="modal-title-bar">
            <div className="modal-icon">📋</div>
            <span className="modal-title">Listar Clientes</span>
            <button className="modal-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        <div className="modal-content">
          <div className="consulta-header">
            <h2 className="consulta-title">Consulta de Facturas</h2>
          </div>

          <div className="search-section">
            <div className="search-controls">
              <label className="search-label">Buscar Por</label>
              <select className="search-dropdown" value={searchBy} onChange={(e) => setSearchBy(e.target.value)}>
                <option value="cliente">cliente</option>
                <option value="fecha">fecha</option>
                <option value="numero">número</option>
              </select>

              <label className="search-label">Cliente</label>
              <input
                type="text"
                className="search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Ingrese criterio de búsqueda"
              />

              <button className="search-btn" onClick={handleSearch}>
                Buscar
              </button>
            </div>
          </div>

          <div className="results-section">
            <div className="results-table">
              {searchResults.length === 0 ? (
                <div className="no-results">
                  <p>No hay resultados para mostrar</p>
                </div>
              ) : (
                <table className="sales-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th>Número</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((result, index) => (
                      <tr key={index}>
                        <td>{result.fecha}</td>
                        <td>{result.cliente}</td>
                        <td>{result.numero}</td>
                        <td>{result.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div className="modal-actions">
            <div className="action-buttons">
              <button className="action-btn" onClick={handleShowAll}>
                Mostrar Todos
              </button>
              <button className="action-btn" onClick={handleViewDetail}>
                Ver Detalle Fact...
              </button>
              <div className="print-section">
                <div className="printer-icon">🖨️</div>
                <button className="action-btn" onClick={handlePrint}>
                  Imprimir
                </button>
              </div>
            </div>
            <button className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultaSalesModal
