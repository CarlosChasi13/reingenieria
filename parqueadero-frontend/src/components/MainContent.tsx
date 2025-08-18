import type React from "react"
import "./MainContent.css"

const MainContent: React.FC = () => {
  return (
    <div className="main-content">
      <div className="content-container">
        <div className="image-container">
          <img src="/src/assets/main.png" alt="Dashboard Employee" className="dashboard-image" />
        </div>
      </div>
    </div>
  )
}

export default MainContent
