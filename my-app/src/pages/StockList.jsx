import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import '../styles/stocklist.css';
const StockList = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/stocks") // Fetch from Flask
      .then((response) => response.json())
      .then((data) => setStocks(data))
      .catch(() => setError("Failed to fetch stock data"));
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (stocks.length === 0) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar on the left */}
      

      {/* Content on the right */}
      <div style={{ flex: 1, padding: "32px", backgroundColor: "white", overflow: "auto" }}>
        <h2 style={{ marginBottom: "10px" }}>📊 Stock Market Overview</h2>
        <div style={{ border: "1px solid rgb(213, 213, 213)", borderRadius: "6px", overflow: "hidden" }}>
          <table style={{ width: "75vw", borderCollapse: "collapse", marginTop: "5px" }}>
            <thead>
              <tr>
                <th style={headerStyle}>Name</th>
                <th style={headerStyle}>Status</th>
                <th style={headerStyle}>Percent Change</th>
                <th style={headerStyle}>High Price</th>
                <th style={headerStyle}>Low Price</th>
                <th style={headerStyle}>Details</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr key={stock.symbol}>
                  <td style={cellStyle}>{stock.name}</td>
                  <td style={cellStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: "9999px",
                        fontSize: "12px",
                        backgroundColor: stock.change >= 0 ? "#dcfce7" : "#f1f5f9",
                        color: stock.change >= 0 ? "#166534" : "#64748b",
                      }}
                    >
                      {stock.change >= 0 ? "Online" : "Offline"}
                    </span>
                  </td>
                  <td style={{ ...cellStyle, color: stock.change >= 0 ? "green" : "red" }}>
                    {stock.change}
                  </td>
                  <td style={cellStyle}>{stock.high}</td>
                  <td style={cellStyle}>{stock.low}</td>
                  <td style={cellStyle}>
                    <Link to={`/stock/${stock.symbol}`} style={{ textDecoration: "none", color: "black" }}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const headerStyle = {
  padding: "5px 16px",
  textAlign: "left",
  fontWeight: 500,
  borderBottom: "1px solid #ebebeb",
  color: "black",
};

const cellStyle = {
  padding: "5px 16px",
  borderBottom: "1px solid #ebebeb",
  color: "black",
};

export default StockList;
