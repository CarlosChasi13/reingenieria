"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { authService } from "../../services/api"
import "./Modal.css"

interface ChangePasswordModalProps {
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

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState<Usuario[]>([])
  const [selectedUser, setSelectedUser] = useState<Usuario | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      loadUsers()
    }
  }, [isOpen])

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

  const handleModify = async () => {
    if (!selectedUser) {
      setError("Seleccione un usuario para cambiar la contraseña")
      return
    }

    if (!password.trim()) {
      setError("La nueva contraseña es requerida")
      return
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await authService.changePassword(selectedUser.id, password)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        onClose()
        setPassword("") // Clear password after successful change
        setSelectedUser(null)
      }, 1500)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cambiar contraseña")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-window change-password-modal">
        <div className="modal-header">
          <div className="modal-icon">
            <img src="/window-icon.png" alt="Window" />
          </div>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-content">
          <h2 className="modal-title orange-title">Modificar Password</h2>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Contraseña modificada exitosamente</div>}

          <div className="password-layout">
            <div className="user-section">
              <h3>Buscar Usuario</h3>
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
                      <th>TELÉFONO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user.id}
                        onClick={() => handleUserSelect(user)}
                        className={selectedUser?.id === user.id ? "selected-row" : ""}
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

            <div className="password-section">
              <div className="form-row">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (error) setError(null)
                  }}
                  className="form-input"
                  disabled={isLoading || !selectedUser}
                  placeholder="Ingrese la nueva contraseña"
                />
              </div>

              <div className="modal-buttons">
                <button className="btn btn-primary" onClick={handleModify} disabled={isLoading || !selectedUser}>
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

export default ChangePasswordModal
