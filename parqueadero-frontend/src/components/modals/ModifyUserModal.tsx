"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { authService } from "../../services/api"
import "./Modal.css"

interface ModifyUserModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Usuario {
  id: number
  usuario: string
  tipo: string
  nombres: string
  apellidos: string
  dni: string
  telefono: string
}

const ModifyUserModal: React.FC<ModifyUserModalProps> = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState<Usuario[]>([])
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null)
  const [formData, setFormData] = useState({
    usuario: "",
    nombres: "",
    apellidos: "",
    dni: "",
    telefono: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadUsers()
    }
  }, [isOpen])

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        usuario: selectedUser.usuario,
        nombres: selectedUser.nombres,
        apellidos: selectedUser.apellidos,
        dni: selectedUser.dni,
        telefono: selectedUser.telefono,
      })
    }
  }, [selectedUser])

  const loadUsers = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const usersData = await authService.getAllUsers()
      setUsers(usersData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar usuarios")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  const handleUserSelect = (user: Usuario) => {
    setSelectedUser(user)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (error) setError(null)
  }

  const handleModificar = async () => {
    if (!selectedUser) {
      setError("Seleccione un usuario para modificar")
      return
    }

    if (!formData.usuario.trim()) {
      setError("El usuario es requerido")
      return
    }
    if (!formData.nombres.trim()) {
      setError("El nombre es requerido")
      return
    }
    if (!formData.apellidos.trim()) {
      setError("El apellido es requerido")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await authService.updateUser(selectedUser.id, formData)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        loadUsers() // Reload users to show updated data
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al modificar usuario")
    } finally {
      setIsLoading(false)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.apellidos.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          <h2 className="modal-title orange-title">Modificar Usuario</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Usuario modificado exitosamente</div>}

          <div className="modify-layout">
            <div className="client-table-section">
              <div className="search-section">
                <label>Buscar Usuario</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  placeholder="Buscar por usuario, nombre o apellido..."
                />
              </div>

              {isLoading ? (
                <div className="loading-message">Cargando usuarios...</div>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>USUARIO</th>
                      <th>TIPO</th>
                      <th>NOMBRES</th>
                      <th>APELLIDOS</th>
                      <th>DNI</th>
                      <th>TELEFONO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        className={selectedUser?.id === user.id ? "selected-row" : ""}
                        style={{ cursor: "pointer" }}
                      >
                        <td>{user.id}</td>
                        <td>{user.usuario}</td>
                        <td>{user.tipo}</td>
                        <td>{user.nombres}</td>
                        <td>{user.apellidos}</td>
                        <td>{user.dni}</td>
                        <td>{user.telefono}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="client-form-section">
              <div className="form-fields">
                <div className="form-row">
                  <label>Usuario</label>
                  <input
                    type="text"
                    name="usuario"
                    value={formData.usuario}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedUser}
                  />
                </div>

                <div className="form-row">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="nombres"
                    value={formData.nombres}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedUser}
                  />
                </div>

                <div className="form-row">
                  <label>Apellido</label>
                  <input
                    type="text"
                    name="apellidos"
                    value={formData.apellidos}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedUser}
                  />
                </div>

                <div className="form-row">
                  <label>Dni</label>
                  <input
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedUser}
                  />
                </div>

                <div className="form-row">
                  <label>Telefono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="form-input"
                    disabled={isLoading || !selectedUser}
                  />
                </div>
              </div>

              <div className="modal-buttons">
                <button className="btn btn-primary" onClick={handleModificar} disabled={isLoading || !selectedUser}>
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

export default ModifyUserModal
