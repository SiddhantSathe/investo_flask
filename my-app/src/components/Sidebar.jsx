"use client"

import "../styles/sidebar.css"
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import Image from "../assets/images/rough.png"
export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("reached")
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("authToken"); // Example of clearing auth token
      navigate("/login"); // Redirect to login page
    }
  };
  function NavItem({ icon, label, active, onClick }) {
    return (
      <li onClick={onClick} style={{ cursor: "pointer" }}>
        <a href="#" className={`nav-item ${active ? "active" : ""}`}>
          {icon}
          <span>{label}</span>
        </a>
      </li>
    );
  }
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        
          <h2 className="sidebar-title" style={{margin:"auto"}}>InvesTo</h2>
          
        
        <button className="sidebar-menu-button">
        <img src={Image} alt="Rough Example" style={{ width: "42px", height: "auto" }} />
        </button>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          <Link to="/dashboard">
          <NavItem icon={HomeIcon()} label="Home"  />
          </Link>
          <Link to="/insurance">
          <NavItem icon={InsuranceIcon()} label="Insurance" className="nav-item" />
          </Link>
          <Link to="/stock-list">
            <NavItem icon={<StocksIcon />} label="Stocks" className="nav-item" />
          </Link>
          <Link to='/bonds'>
          <NavItem icon={BondsIcon()} label="Bonds" className="nav-item" />
          </Link>
          <Link to="/suggestion">
          <NavItem icon={HomeIcon()} label="Suggestions" className="nav-item"  />
          </Link>
          <Link to="/mynotifications">
          <NavItem icon={NotificationIcon()} label="Notification" className="nav-item"  />
          </Link>
          <Link to="/collabform">
          <NavItem icon={CollaborationIcon()} label="Collaboration" className="nav-item"  />
          </Link>
        </ul>

        {/* <div className="sidebar-section">
          <ul className="nav-list">
            <NavItem icon={CollaborationIcon()} label="Collaboration" />
            <NavItem icon={NotificationIcon()} label="Notification" />
            <NavItem icon={LogoutIcon()} label="Logout" onClick={handleLogout} />

          </ul>
        </div> */}
      </nav>

      <div className="sidebar-footer">
      
      <Link to="/profile">
        <NavItem icon={<ProfileIcon />} label="View Profile" />
      </Link>
          {/* <div className="user-info">
            <p style={{width:"100px"}}>View profile</p>
          </div> */}
       
      </div>
    </div>
  )
}

function NavItem({ icon, label, active }) {
  return (
    <li>
      <a href="#" className={`nav-item ${active ? "active" : ""}`}>
        {icon}
        <span>{label}</span>
      </a>
    </li>
  )
}

// Icons
function HomeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  )
}


function InsuranceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </svg>
  )
}

function StocksIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  )
}

function BondsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
  )
}
function CollaborationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="15" r="3"></circle>
      <circle cx="6" cy="15" r="3"></circle>
      <path d="M12 3v6M9 6h6M6 18h12M3 21h18"></path>
    </svg>
  );
}

function NotificationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8v5a4 4 0 0 1-2 3h16a4 4 0 0 1-2-3z"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 17l5-5-5-5"></path>
      <path d="M20 12H9"></path>
      <path d="M4 4v16"></path>
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4"></circle>
      <path d="M16 20a4 4 0 0 0-8 0"></path>
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  )
}





