"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "../styles/pageviewschart.css";
const data = [
  { month: "Jan", Stocks: 5000, Bonds: 3000, Insurance: 1500 },
  { month: "Feb", Stocks: 8000, Bonds: 4000, Insurance: 2000 },
  { month: "Mar", Stocks: 7000, Bonds: 3500, Insurance: 1800 },
  { month: "Apr", Stocks: 9000, Bonds: 5000, Insurance: 2500 },
  { month: "May", Stocks: 11000, Bonds: 6000,Insurance: 3000 },
  { month: "Jun", Stocks: 6000, Bonds: 3200, Insurance: 1600 },
  { month: "Jul", Stocks: 6500, Bonds: 3500, Insurance: 1700 },
];

export default function StocksChart() {
  return (
    <div className="pageviews-chart">
      <div className="pageviews-chart-header">
        <p className="pageviews-chart-title">Summary</p>
        <div className="pageviews-chart-value">
          <p className="total-value">1.3M</p>
          <span className="value-change negative">-8%</span>
        </div>
        
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Bar dataKey="Insurance" stackId="a" fill="#1E40AF" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Bonds" stackId="a" fill="#3B82F6" />
          <Bar dataKey="Stocks" stackId="a" fill="#93C5FD" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
