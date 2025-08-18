"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { clienteService } from "../../services/api"
import "./Modal.css"

interface ModifyClientModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Cliente {
  id: number
  nombres: string
  apellidos: string
  razonSocial: string
  ruc: string
  direccion: string
  telefono: string
  correo: string
}

const ModifyClientModal: React.FC<ModifyClientModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [clients, setClients] = useState<Cliente[]>([])
  const [selectedClient, setSelectedClient] = useState<Cliente | null>(null)
  const [formData, setFormData] = useState({
    razonSocial: "",
    ruc: "",
    direccion: "",
    telefono: "",
    nombre: "",
    apellidos: "",
    correo: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadClients()
    }
  }, [isOpen])

  const loadClients = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const clientsData = await clienteService.getAll()
      setClients(clientsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar clientes")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredClients = clients.filter(
    (client) =>
      client.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.ruc.includes(searchTerm),
  )

  if (!isOpen) return null

  const handleClientSelect = (client: Cliente) => {
    setSelectedClient(client)
    setFormData({
      razonSocial: client.razonSocial,
      ruc: client.ruc,
      direccion: client.direccion,
      telefono: client.telefono,
      nombre: client.nombres,
      apellidos: client.apellidos,
      correo: client.correo,
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError(null)
  }

  const handleModify = async () => {
    if (!selectedClient) {
      setError("Seleccione un cliente para modificar")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await clienteService.update(selectedClient.id, {
        nombres: formData.nombre,
        apellidos: formData.apellidos,
        razonSocial: formData.razonSocial,
        ruc: formData.ruc,
        direccion: formData.direccion,
        telefono: formData.telefono,
        correo: formData.correo,
      })
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
        loadClients() // Reload clients after modification
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al modificar cliente")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window modify-client-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/window-icon.png" alt="Window" />
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <h2 className="modal-title orange-title">Modificar Cliente</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Cliente modificado exitosamente</div>}

          <div className="modify-layout">
            <div className="client-table-section">
              {isLoading ? (
                <div className="loading-message">Cargando clientes...</div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>CÓDIGO</th>
                      <th>NOMBRES</th>
                      <th>APELLIDOS</th>
                      <th>RAZÓN SOCIAL</th>
                      <th>RUC</th>
                      <th>DIRECCIÓN</th>
                      <th>TELÉFONO</th>
                      <th>CORREO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr
                        key={client.id}
                        onClick={() => handleClientSelect(client)}
                        className={selectedClient?.id === client.id ? "selected-row" : ""}
                      >
                        <td>{client.id}</td>
                        <td>{client.nombres}</td>
                        <td>{client.apellidos}</td>
                        <td>{client.razonSocial}</td>
                        <td>{client.ruc}</td>
                        <td>{client.direccion}</td>
                        <td>{client.telefono}</td>
                        <td>{client.correo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="client-form-section">
              <div className="search-section">
                <label>Buscar Cliente</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  placeholder="Buscar por nombre, apellido o RUC"
                />
              </div>

              <div className="form-fields">
                <div className="form-row">
                  <label>Razón social</label>
                  <input
                    type="text"
                    name="razonSocial"
                    value={formData.razonSocial}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedClient}
                  />
                </div>

                <div className="form-row">
                  <label>RUC</label>
                  <input
                    type="text"
                    name="ruc"
                    value={formData.ruc}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedClient}
                  />
                </div>

                <div className="form-row">
                  <label>Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedClient}
                  />
                </div>

                <div className="form-row">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedClient}
                  />
                </div>

                <div className="form-row">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedClient}
                  />
                </div>

                <div className="form-row">
                  <label>Apellidos</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedClient}
                  />
                </div>

                <div className="form-row">
                  <label>Correo</label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedClient}
                  />
                </div>
              </div>

              <div className="modal-buttons">
                <button className="btn btn-primary" onClick={handleModify} disabled={isLoading || !selectedClient}>
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

export default ModifyClientModal
