import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "../styles/stockdetails.css"; // Import CSS file
import { useNavigate } from "react-router-dom";
// Register Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const StockDetails = () => {
  const navigate = useNavigate();
  const { symbol } = useParams();
  const [stock, setStock] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetch(`http://127.0.0.1:5000/stockdetails/${symbol}`)
      .then((response) => response.json())
      .then((data) => setStock(data))
      .catch(() => setError("🚨 Failed to fetch stock data."));

    fetch(`http://127.0.0.1:5000/recommendation/${symbol}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setRecommendations(data);
          setSelectedPeriod(data[0].period);
        }
      })
      .catch(() => console.error("Error fetching recommendations"));
  }, [symbol]);

  const selectedRecommendation = recommendations.find(rec => rec.period === selectedPeriod);

  if (error) return <p className="error">{error}</p>;
  if (!stock) return <p className="loading">⏳ Loading stock details...</p>;

  return (
    <div className="container">
      

      {/* Stock Info */}
      <div className="stock-info">
      <h2 className="title">{stock.name} ({stock.symbol})</h2>
        <table>
          <tbody>
            <tr><td> <b>Current Price</b></td><td>${stock.current_price || 0}</td></tr>
            <tr><td> <b>High</b></td><td>${stock.high || 0}</td></tr>
            <tr><td> <b>Low</b></td><td>${stock.low || 0}</td></tr>
            <tr><td> <b>Change</b></td><td>{stock.change || 0}%</td></tr>
            <tr><td> <b>Market Cap</b></td><td>${stock.market_cap || "N/A"}B</td></tr>
            <tr><td> <b>Previous Close</b></td><td>${stock.prev_close || 0}</td></tr>
            <tr><td> <b>Exchange</b></td><td>{stock.exchange || "N/A"}</td></tr>
          </tbody>
        </table>
        <button style={{marginLeft: '33px', marginBottom: '10px'}} onClick={() => navigate("/buyform", { state: { name: stock.name, price: stock.current_price } })}>Buy</button>
      </div>

      {/* Recommendations */}
      <div className="recommendation-container">
        <h3> Recommendation Trends</h3>
        {recommendations.length > 0 && (
          <>
            <div className="dropdown-container">
              <label>Select Period: </label>
              <select onChange={(e) => setSelectedPeriod(e.target.value)} value={selectedPeriod}>
                {recommendations.map((rec, index) => (
                  <option key={index} value={rec.period}>{rec.period}</option>
                ))}
              </select>
            </div>

            {selectedRecommendation && (
              <div className="chart-container">
                <Pie
                  data={{
                    labels: ["Strong Buy", "Buy", "Hold", "Sell", "Strong Sell"],
                    datasets: [
                      {
                        data: [
                          selectedRecommendation.strongBuy,
                          selectedRecommendation.buy,
                          selectedRecommendation.hold,
                          selectedRecommendation.sell,
                          selectedRecommendation.strongSell
                        ],
                        backgroundColor: ["#2ecc71", "#3498db", "#f1c40f", "#e74c3c", "#7f8c8d"],
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "bottom" },
                    },
                  }}
                />
                
              </div>
            )}
            
          </>
          
        )}
        
      </div>
      
    </div>
  );
};

export default StockDetails;
