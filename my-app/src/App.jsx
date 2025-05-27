import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile"; 
import SignupForm from "./components/SignUp";
import {  AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import "./App.css";
import StockDetails from "./pages/StockDetails";
import StockList from "./pages/StockList";
import BondsList from "./pages/BondList";
import Table from "./components/table"
import Collabform from "./components/CollabForm";
import Buyform from "./components/buyform";
import Suggestions from "./components/Suggestion";
import { WalletProvider } from "./context/WalletContext";
import Insurance from "./components/Insurance";
import CollaborationRequests from "./components/collab"

function Layout() {
  const location = useLocation(); 
  const hideSidebar = location.pathname.startsWith("/login") || location.pathname.startsWith("/signup");

  return (
    <div className="app-container">
      {!hideSidebar && <Sidebar />} 
      
      <div className="page-content">
      <WalletProvider>
        <AuthProvider>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/stock-list" element={<StockList />} />
            <Route path="/table" element={<Table />} />
            <Route path="/stock/:symbol" element={<StockDetails />} />
            <Route path="/bonds" element={<BondsList />} />
            <Route path="/suggestion" element={<Suggestions />} />
            <Route path="/collabform" element={<Collabform />} />
            <Route path="/buyform" element={<Buyform />} />
            <Route path="/insurance" element={<Insurance />} />
            <Route path='/mynotifications' element={<CollaborationRequests />} />
          </Routes>
        </AuthProvider>
        </WalletProvider>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;