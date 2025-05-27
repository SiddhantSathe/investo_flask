"use client"

import "../styles/investmentsummary.css"

export default function InvestmentSummary() {
  return (
    <div className="investment-summaryy">
      <div className="investment-summary-header">
        <div>
          <h3 className="investment-summary-title">Investment Summary</h3>
          <div className="investment-summary-value">
            <p className="total-value">$325,000</p>
            <span className="value-change positive">+35%</span>
          </div>
          <p className="investment-summary-period">Total portfolio value for the last 30 days</p>
        </div>
      </div>

      <div className="investment-metrics">
        <div className="investment-metric">
          <div className="metric-label">
            <div className="metric-indicator blue"></div>
            <span>Total Invested</span>
          </div>
          <span className="metric-value">$250,000</span>
        </div>

        <div className="investment-metric">
          <div className="metric-label">
            <div className="metric-indicator green"></div>
            <span>Profit Amount</span>
          </div>
          <span className="metric-value positive">+$45,000</span>
        </div>

        <div className="investment-metric">
          <div className="metric-label">
            <div className="metric-indicator red"></div>
            <span>Loss Amount</span>
          </div>
          <span className="metric-value negative">-$15,000</span>
        </div>

        <div className="investment-metric">
          <div className="metric-label">
            <div className="metric-indicator purple"></div>
            <span>Current Balance</span>
          </div>
          <span className="metric-value">$280,000</span>
        </div>
      </div>

     
    </div>
  )
}

