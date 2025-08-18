"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import "./Toolbar.css"

interface ToolbarItem {
  id: string
  icon: string
  label: string
  onClick?: () => void
  hasDropdown?: boolean
}

interface ToolbarProps {
  onLogout?: () => void
  onMenuAction?: (action: string) => void
}

const Toolbar: React.FC<ToolbarProps> = ({ onLogout, onMenuAction }) => {
  const [showArchivoMenu, setShowArchivoMenu] = useState(false)
  const [showDatabaseMenu, setShowDatabaseMenu] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const [showCajaMenu, setShowCajaMenu] = useState(false)
  const [showClientesSubmenu, setShowClientesSubmenu] = useState(false)
  const [showUsuariosSubmenu, setShowUsuariosSubmenu] = useState(false)
  const [showEspacioSubmenu, setShowEspacioSubmenu] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)
  const databaseMenuRef = useRef<HTMLDivElement>(null)
  const moreMenuRef = useRef<HTMLDivElement>(null)
  const cajaMenuRef = useRef<HTMLDivElement>(null)

  const toolbarItems: ToolbarItem[] = [
    { id: "archivo", icon: "📁", label: "Archivo", hasDropdown: true },
    { id: "database", icon: "🗄️", label: "Base de Datos", hasDropdown: true },
    { id: "mas", icon: "🔧", label: "Mas..." },
    { id: "ventas", icon: "💰", label: "Ventas/POS" },
    { id: "consultas", icon: "🔍", label: "Consultas Ventas" },
    { id: "vaciar", icon: "🗑️", label: "Vaciar base de datos" },
    { id: "caja", icon: "💼", label: "Caja", hasDropdown: true },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowArchivoMenu(false)
      }
      if (databaseMenuRef.current && !databaseMenuRef.current.contains(event.target as Node)) {
        setShowDatabaseMenu(false)
        setShowClientesSubmenu(false)
        setShowUsuariosSubmenu(false)
        setShowEspacioSubmenu(false)
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false)
      }
      if (cajaMenuRef.current && !cajaMenuRef.current.contains(event.target as Node)) {
        setShowCajaMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleItemClick = (item: ToolbarItem) => {
    if (item.id === "archivo") {
      setShowArchivoMenu(!showArchivoMenu)
      setShowDatabaseMenu(false)
      setShowMoreMenu(false)
      setShowCajaMenu(false)
    } else if (item.id === "database") {
      setShowDatabaseMenu(!showDatabaseMenu)
      setShowArchivoMenu(false)
      setShowMoreMenu(false)
      setShowClientesSubmenu(false)
      setShowUsuariosSubmenu(false)
      setShowEspacioSubmenu(false)
      setShowCajaMenu(false)
    } else if (item.id === "mas") {
      setShowMoreMenu(!showMoreMenu)
      setShowArchivoMenu(false)
      setShowDatabaseMenu(false)
      setShowClientesSubmenu(false)
      setShowUsuariosSubmenu(false)
      setShowEspacioSubmenu(false)
      setShowCajaMenu(false)
    } else if (item.id === "caja") {
      setShowCajaMenu(!showCajaMenu)
      setShowArchivoMenu(false)
      setShowDatabaseMenu(false)
      setShowMoreMenu(false)
      setShowClientesSubmenu(false)
      setShowUsuariosSubmenu(false)
      setShowEspacioSubmenu(false)
    } else if (item.id === "ventas") {
      console.log(`Clicked: ${item.label}`)
      if (onMenuAction) {
        onMenuAction("open-cash-register")
      }
    } else {
      console.log(`Clicked: ${item.label}`)
    }
  }

  const handleLogout = () => {
    setShowArchivoMenu(false)
    if (onLogout) {
      onLogout()
    }
  }

  const handleClientesHover = () => {
    setShowClientesSubmenu(true)
    setShowUsuariosSubmenu(false)
    setShowEspacioSubmenu(false)
  }

  const handleUsuariosHover = () => {
    setShowUsuariosSubmenu(true)
    setShowClientesSubmenu(false)
    setShowEspacioSubmenu(false)
  }

  const handleEspacioHover = () => {
    setShowEspacioSubmenu(true)
    setShowClientesSubmenu(false)
    setShowUsuariosSubmenu(false)
  }

  const handleSubmenuAction = (action: string) => {
    console.log(`Database action: ${action}`)
    if (onMenuAction) {
      const modalMap: { [key: string]: string } = {
        "agregar-cliente": "add-client",
        "modificar-cliente": "modify-client",
        "consultar-clientes": "consult-client",
        "cambiar-password": "change-password",
        "agregar-espacio": "add-space",
        "modificar-espacio": "modify-space",
        "liberar-espacio": "free-space",
      }

      const modalName = modalMap[action]
      if (modalName) {
        onMenuAction(modalName)
      }
    }

    setShowDatabaseMenu(false)
    setShowClientesSubmenu(false)
    setShowUsuariosSubmenu(false)
    setShowEspacioSubmenu(false)
  }

  const handleMoreMenuAction = (action: string) => {
    console.log(`More menu action: ${action}`)
    if (onMenuAction) {
      onMenuAction(action)
    }
    setShowMoreMenu(false)
  }

  const handleCajaMenuAction = (action: string) => {
    console.log(`Cash register action: ${action}`)
    if (onMenuAction) {
      onMenuAction(action)
    }
    setShowCajaMenu(false)
  }

  return (
    <div className="toolbar">
      {toolbarItems.map((item) => (
        <div
          key={item.id}
          className="toolbar-item-container"
          ref={
            item.id === "archivo"
              ? menuRef
              : item.id === "database"
                ? databaseMenuRef
                : item.id === "mas"
                  ? moreMenuRef
                  : item.id === "caja"
                    ? cajaMenuRef
                    : null
          }
        >
          <div className="toolbar-item" onClick={() => handleItemClick(item)}>
            <div className="toolbar-icon">{item.icon}</div>
            <span className="toolbar-label">{item.label}</span>
          </div>

          {item.id === "archivo" && showArchivoMenu && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={handleLogout}>
                <span className="dropdown-icon">🚪</span>
                <span>Salir</span>
              </div>
            </div>
          )}

          {item.id === "database" && showDatabaseMenu && (
            <div className="dropdown-menu database-menu">
              <div className="dropdown-item has-submenu" onMouseEnter={handleClientesHover}>
                <span className="dropdown-icon">👤</span>
                <span>Clientes</span>
                <span className="submenu-arrow">▶</span>

                {showClientesSubmenu && (
                  <div className="submenu">
                    <div className="dropdown-item" onClick={() => handleSubmenuAction("agregar-cliente")}>
                      <span className="dropdown-icon">➕</span>
                      <span>Agregar nuevo Cliente</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleSubmenuAction("modificar-cliente")}>
                      <span className="dropdown-icon">👤🔧</span>
                      <span>Modificar Cliente</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleSubmenuAction("consultar-clientes")}>
                      <span className="dropdown-icon">👤🔍</span>
                      <span>Consultar Clientes</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="dropdown-item has-submenu" onMouseEnter={handleUsuariosHover}>
                <span className="dropdown-icon">👥</span>
                <span>Usuarios</span>
                <span className="submenu-arrow">▶</span>

                {showUsuariosSubmenu && (
                  <div className="submenu">
                    <div className="dropdown-item" onClick={() => handleSubmenuAction("agregar-usuario")}>
                      <span className="dropdown-icon">📄➕</span>
                      <span>Agregar Usuario</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleSubmenuAction("modificar-usuario")}>
                      <span className="dropdown-icon">👤🔧</span>
                      <span>Modificar</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleSubmenuAction("cambiar-password")}>
                      <span className="dropdown-icon">🔒</span>
                      <span>Cambiar password</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="dropdown-item has-submenu" onMouseEnter={handleEspacioHover}>
                <span className="dropdown-icon">🏢</span>
                <span>Espacio</span>
                <span className="submenu-arrow">▶</span>

                {showEspacioSubmenu && (
                  <div className="submenu">
                    <div className="dropdown-item" onClick={() => handleSubmenuAction("agregar-espacio")}>
                      <span className="dropdown-icon">➕</span>
                      <span>Agregar</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleSubmenuAction("modificar-espacio")}>
                      <span className="dropdown-icon">👤🔧</span>
                      <span>Modificar</span>
                    </div>
                    <div className="dropdown-item" onClick={() => handleSubmenuAction("liberar-espacio")}>
                      <span className="dropdown-icon">👤➡️</span>
                      <span>Liberar espacio</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {item.id === "mas" && showMoreMenu && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleMoreMenuAction("about-programs")}>
                <span className="dropdown-icon">👤</span>
                <span>Acerca de Programas</span>
              </div>
              <div className="dropdown-item" onClick={() => handleMoreMenuAction("configuration")}>
                <span className="dropdown-icon">🔧</span>
                <span>Configuracion</span>
              </div>
            </div>
          )}

          {item.id === "caja" && showCajaMenu && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleCajaMenuAction("cash-register-list")}>
                <span className="dropdown-icon">📋</span>
                <span>Lista Cajas</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Toolbar
