import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/table.css";

function AnalyticsDashboard() {
  const [stocks, setStocks] = useState([
    { id: 1, name: "Apple Inc", symbol: "AAPL", status: "Online", percentChange: 18.5, highPrice: 345, lowPrice: 212 },
    { id: 2, name: "Microsoft", symbol: "MSFT", status: "Online", percentChange: 9.7, highPrice: 653, lowPrice: 172},
    { id: 3, name: "Tesla Motors", symbol: "TSLA", status: "Offline", percentChange: 15.2, highPrice: 1355, lowPrice: 582 }
  ]);

  // Function to handle selling a stock
  const handleSell = (id, name) => {
    const confirmSell = window.confirm(`Do you want to sell this share: ${name}?`);
    if (confirmSell) {
      setStocks(stocks.filter(stock => stock.id !== id)); // Remove stock from list
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "white" }}>
      <div style={{ flex: 1, padding: "32px", overflow: "auto" }}>
        <div className="buttons" style={{ width: "300px", justifyContent: "space-between", display: "flex", paddingBottom: "10px" }}>
          <button>Stocks</button>
          <button>Bonds</button>
          <button>Insurance</button>
        </div>

        {/* Data Table */}
        <div style={{ border: "1px solid rgb(213, 213, 213)", borderRadius: "6px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse",marginTop:"5px" }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Percent Change</th>
                <th style={tableHeaderStyle}>High Price of the Day</th>
                <th style={tableHeaderStyle}>Current Price of the day</th>
                <th style={tableHeaderStyle}></th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(stock => (
                <tr key={stock.id}>
                  <td style={tableCellStyle}>
                    <Link to={`/stockdetails/${stock.symbol}`}>{stock.name}</Link>
                  </td>
                  <td style={tableCellStyle}>
                    <span style={getStatusStyle(stock.status)}>{stock.status}</span>
                  </td>
                  <td style={tableCellStyle}>{stock.percentChange}</td>
                  <td style={tableCellStyle}>{stock.highPrice}</td>
                  <td style={tableCellStyle}>{stock.lowPrice}</td>
                  <td style={tableCellStyle}>
                    <button style={sellButtonStyle} onClick={() => handleSell(stock.id, stock.name)}>Sell</button>
                  </td>
                </tr>
              ))}
              {stocks.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "10px", color: "gray" }}>No stocks available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Styles for Table Headers and Cells
const tableHeaderStyle = {
  padding: "5px 16px",
  textAlign: "left",
  fontWeight: 500,
  borderBottom: "1px solid #ebebeb",
  color: "black",
};

const tableCellStyle = {
  padding: "5px 16px",
  borderBottom: "1px solid #ebebeb",
  color: "black",
};

// Status Badge Styles
const getStatusStyle = (status) => ({
  display: "inline-block",
  padding: "2px 8px",
  borderRadius: "9999px",
  fontSize: "12px",
  backgroundColor: status === "Online" ? "#dcfce7" : "#f1f5f9",
  color: status === "Online" ? "#166534" : "#64748b",
});

// Sell Button Styles
const sellButtonStyle = {
  backgroundColor: "grey",
  color: "white",
  padding: "5px 10px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
};

export default AnalyticsDashboard;
