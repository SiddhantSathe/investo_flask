"use client"

import { useState } from "react"
import Sidebar from "./Sidebar"
import StatCard from "./StatCard"
import InvestmentSummary from "./InvestmentSummary"
import PageViewsChart from "./PageViewsChart"
import "../styles/dashboard.css"
import Table from "./table"
export default function Dashboard() {
  const [currentDate] = useState("Apr 17, 2023")

  return (
    <div className="dashboard-container" style={{width:"80vw"}}>
      

      <div className="main-content">
        <header className="dashboard-header">
          <div className="header-title">
            <h1 className="dashboard-title">Dashboard</h1>
            <span className="header-separator">›</span>
            
          </div>

          
        </header>

        <main className="dashboard-main">
          <h2 className="section-title">Overview</h2>

          <div className="stat-cards">
            <StatCard
              title="Stocks"
              value="$250K"
              change="+25%"
              changeType="positive"
              period="Last 30 days"
              chartColor="green"
            />

            <StatCard
              title="Bonds"
              value="$45K"
              change="-25%"
              changeType="negative"
              period="Last 30 days"
              chartColor="red"
            />

            <StatCard
              title="Insurances"
              value="$280K"
              change="+5%"
              changeType="positive"
              period="Last 30 days"
              chartColor="gray"
            />
          </div>

          <div className="chart-container">
            <InvestmentSummary />
            <PageViewsChart />
          </div>

          <div className="details-section">
          <Table/>
          </div>
        </main>
        
      </div>
      
    </div>
  )
}

