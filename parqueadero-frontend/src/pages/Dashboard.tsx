"use client"

import type React from "react"
import { useState } from "react"
import Toolbar from "../components/Toolbar"
import MainContent from "../components/MainContent"
import AddClientModal from "../components/modals/AddClientModal"
import ModifyClientModal from "../components/modals/ModifyClientModal"
import ConsultClientModal from "../components/modals/ConsultClientModal"
import ChangePasswordModal from "../components/modals/ChangePasswordModal"
import AddUserModal from "../components/modals/AddUserModal"
import ModifyUserModal from "../components/modals/ModifyUserModal"
import AddSpaceModal from "../components/modals/AddSpaceModal"
import ModifySpaceModal from "../components/modals/ModifySpaceModal"
import FreeSpaceModal from "../components/modals/FreeSpaceModal"
import ConfigurationModal from "../components/modals/ConfigurationModal"
import OpenCashRegisterModal from "../components/modals/OpenCashRegisterModal"
import CashRegisterListModal from "../components/modals/CashRegisterListModal"
import ConsultaSalesModal from "../components/modals/ConsultaSalesModal"
import SalesScreen from "../components/SaleScreen"
import "./Dashboard.css"

interface DashboardProps {
  onLogout?: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isSalesScreenOpen, setIsSalesScreenOpen] = useState(false)
  const [cashAmount, setCashAmount] = useState(0)

  const handleMenuAction = (action: string) => {
    setActiveModal(action)
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const handleOpenCashRegister = async (amount: number) => {
    try {
      // TODO: Connect to backend API to open cash register
      setCashAmount(amount)
      setIsSalesScreenOpen(true)
      setActiveModal(null)
    } catch (error) {
      console.error("Error opening cash register:", error)
      throw error
    }
  }

  const handleCloseCashRegister = () => {
    setIsSalesScreenOpen(false)
    setCashAmount(0)
  }

  const handleSalesModalAction = (modalType: string) => {
    setActiveModal(modalType)
  }

  return (
    <div className="dashboard">
      <Toolbar onLogout={onLogout} onMenuAction={handleMenuAction} />
      {!isSalesScreenOpen && <MainContent />}

      <SalesScreen
        isOpen={isSalesScreenOpen}
        cashAmount={cashAmount}
        onCloseCashRegister={handleCloseCashRegister}
        onOpenClientModal={handleSalesModalAction}
      />

      <OpenCashRegisterModal
        isOpen={activeModal === "open-cash-register"}
        onClose={closeModal}
        onOpenCashRegister={handleOpenCashRegister}
      />

      <CashRegisterListModal isOpen={activeModal === "cash-register-list"} onClose={closeModal} />

      <AddClientModal isOpen={activeModal === "add-client"} onClose={closeModal} />
      <ModifyClientModal isOpen={activeModal === "modify-client"} onClose={closeModal} />
      <ConsultClientModal isOpen={activeModal === "consult-client"} onClose={closeModal} />
      <ChangePasswordModal isOpen={activeModal === "change-password"} onClose={closeModal} />
      <AddUserModal isOpen={activeModal === "add-user"} onClose={closeModal} />
      <ModifyUserModal isOpen={activeModal === "modify-user"} onClose={closeModal} />
      <AddSpaceModal isOpen={activeModal === "add-space"} onClose={closeModal} />
      <ModifySpaceModal isOpen={activeModal === "modify-space"} onClose={closeModal} />
      <FreeSpaceModal isOpen={activeModal === "free-space"} onClose={closeModal} />
      <ConfigurationModal isOpen={activeModal === "configuration"} onClose={closeModal} />
      <ConsultaSalesModal isOpen={activeModal === "consulta-ventas"} onClose={closeModal} />
    </div>
  )
}

export default Dashboard
