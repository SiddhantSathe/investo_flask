"use client";

import "../styles/statcard.css";

export default function StatCard({ title, value, change, changeType, period, chartColor }) {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title}</h3>
        <p className="stat-card-value">{value}</p>
        <p className="stat-card-period">{period}</p>
        <div className={`stat-change ${changeType === "positive" ? "positive" : "negative"}`}>
          {change}
        </div>
      </div>

      <div className={`stat-chart ${chartColor}`}>
        <svg width="100%" height="40">
          <polyline
            fill="none"
            stroke={chartColor === "green" ? "#22C55E" : chartColor === "red" ? "#EF4444" : "#64748B"}
            strokeWidth="2"
            points={generateChartData()}
          />
        </svg>
      </div>
    </div>
  );
}

function generateChartData() {
  let points = [];
  for (let i = 0; i < 10; i++) {
    let x = i * 10;
    let y = Math.floor(Math.random() * 20) + 10;
    points.push(`${x},${y}`);
  }
  return points.join(" ");
}
