"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { clienteService } from "../../services/api"
import "./Modal.css"

interface ConsultClientModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Cliente {
  idCliente: number
  nombreCliente: string
  apellidoCliente: string
  razonSCliente: string
  rucCliente: string
  direccionCliente: string
  telefonoCliente: string
  correoCliente: string
}

const ConsultClientModal: React.FC<ConsultClientModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [clients, setClients] = useState<Cliente[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setSearchTerm("")
      setClients([])
      setError(null)
      setHasSearched(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || !searchTerm.trim()) return

    const timeoutId = setTimeout(() => {
      searchClients(searchTerm.trim())
    }, 500) // 500ms debounce

    return () => clearTimeout(timeoutId)
  }, [searchTerm, isOpen])

  const searchClients = async (term: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const allClients = await clienteService.getAll()
      const filtered = allClients.filter(
        (client: Cliente) =>
          client.nombreCliente.toLowerCase().includes(term.toLowerCase()) ||
          client.apellidoCliente.toLowerCase().includes(term.toLowerCase()) ||
          client.rucCliente.includes(term) ||
          client.razonSCliente.toLowerCase().includes(term.toLowerCase()),
      )
      setClients(filtered)
      setHasSearched(true)
    } catch (err) {
      console.error("[v0] Error searching clients:", err)
      setError(err instanceof Error ? err.message : "Error al buscar clientes")
      setClients([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleShowAll = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const clientsData = await clienteService.getAll()
      setClients(clientsData)
      setHasSearched(true)
    } catch (err) {
      console.error("[v0] Error loading all clients:", err)
      setError(err instanceof Error ? err.message : "Error al cargar clientes")
      setClients([])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const handlePrint = () => {
    if (clients.length === 0) return

    const printContent = `
      <html>
        <head><title>Lista de Clientes</title></head>
        <body>
          <h2>Consulta de Clientes</h2>
          <table border="1" style="border-collapse: collapse; width: 100%;">
            <thead>
              <tr>
                <th>CÓDIGO</th><th>NOMBRES</th><th>APELLIDOS</th><th>RAZÓN SOCIAL</th>
                <th>RUC</th><th>DIRECCIÓN</th><th>TELÉFONO</th><th>CORREO</th>
              </tr>
            </thead>
            <tbody>
              ${clients
                .map(
                  (client) => `
                <tr>
                  <td>${client.idCliente}</td><td>${client.nombreCliente}</td><td>${client.apellidoCliente}</td>
                  <td>${client.razonSCliente}</td><td>${client.rucCliente}</td><td>${client.direccionCliente}</td>
                  <td>${client.telefonoCliente}</td><td>${client.correoCliente}</td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </body>
      </html>
    `
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window consult-client-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/window-icon.png" alt="Window" />
          </div>
          <span className="modal-header-title">Listar Clientes</span>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <h2 className="modal-title black-title">Consulta de Clientes</h2>

          {error && <div className="error-message">{error}</div>}

          <div className="search-section">
            <label>Buscar cliente</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
              placeholder="Buscar por nombre, apellido, RUC o razón social"
              disabled={isLoading}
            />
          </div>

          <div className="table-section">
            {isLoading ? (
              <div className="loading-message">Cargando clientes...</div>
            ) : !hasSearched ? (
              <div className="empty-message">
                Haga clic en "Mostrar Todos" para ver todos los clientes o escriba en el campo de búsqueda.
              </div>
            ) : clients.length === 0 ? (
              <div className="empty-message">No se encontraron clientes.</div>
            ) : (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>CÓDIGO</th>
                    <th>NOMBRES</th>
                    <th>APELLIDOS</th>
                    <th>RAZÓN SOC...</th>
                    <th>RUC</th>
                    <th>DIRECCIÓN</th>
                    <th>TELÉFONO</th>
                    <th>CORREO</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.idCliente}>
                      <td>{client.idCliente}</td>
                      <td>{client.nombreCliente}</td>
                      <td>{client.apellidoCliente}</td>
                      <td>{client.razonSCliente}</td>
                      <td>{client.rucCliente}</td>
                      <td>{client.direccionCliente}</td>
                      <td>{client.telefonoCliente}</td>
                      <td>{client.correoCliente}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="modal-bottom">
            <div className="bottom-buttons">
              <button className="btn btn-secondary" onClick={handleShowAll} disabled={isLoading}>
                Mostrar Todos
              </button>
              <button className="btn btn-cancel" onClick={onClose}>
                Cancelar
              </button>
            </div>
            <div className="print-section">
              <div className="printer-icon">
                <img src="/printer-icon.png" alt="Printer" />
              </div>
              <button className="btn btn-print" onClick={handlePrint} disabled={isLoading || clients.length === 0}>
                Imprimir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultClientModal
