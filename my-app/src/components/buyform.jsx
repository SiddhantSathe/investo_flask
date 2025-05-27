import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const BuyForm = () => {
  const location = useLocation();
  const { name, price } = location.state || { name: "Unknown", price: 100 };

  const [walletBalance, setWalletBalance] = useState(0);
  const [formData, setFormData] = useState({ shares: "", cost: price });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/profile/${user}`);
        const data = await response.json();
        if (response.ok) {
          setWalletBalance(data.data.wallet_balance);
        } else {
          console.error("Profile not found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedValue = value.replace(/\D/, ""); // Only allow numbers
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const totalAmount = formData.shares ? formData.shares * formData.cost : 0;

    if (totalAmount > walletBalance) {
      alert("Insufficient balance!");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/update-wallet/${user}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ new_balance: walletBalance - totalAmount }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Purchase successful!");
        setWalletBalance(result.new_balance);
      } else {
        alert("Failed to update wallet.");
      }
    } catch (error) {
      console.error("Error updating wallet:", error);
    }
  };

  const totalAmount = formData.shares ? formData.shares * formData.cost : 0;

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Buy {name} Shares</h2>
        <p style={styles.wallet}><strong>Wallet Balance:</strong> ${walletBalance}</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>No. of Shares</label>
          <input
            type="number"
            name="shares"
            value={formData.shares}
            onChange={handleChange}
            required
            min="1"
            style={styles.input}
          />

          <label style={styles.label}>Current Price (per share)</label>
          <input type="number" value={formData.cost} disabled style={styles.inputDisabled} />

          <label style={styles.label}>Total Amount</label>
          <input type="number" value={totalAmount} disabled style={styles.inputDisabled} />

          <button type="submit" style={styles.button}>Buy</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff", // Light blue background
    width:"80vw"
  },
  card: {
    width: "400px",
    padding: "24px",
    backgroundColor: "#ffffff", // White card
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
    border: "1px solid #d0e1ff",
  },
  title: {
    color: "#003366", // Dark Blue
    fontSize: "22px",
    marginBottom: "15px",
    fontWeight: "bold",
  },
  wallet: {
    color: "#0056b3", // Blue shade
    fontSize: "16px",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: "#003366", // Dark Blue
    fontSize: "14px",
    textAlign: "left",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    backgroundColor: "#ffffff",
    border: "2px solid #007bff",
    borderRadius: "6px",
    color: "#000",
    fontSize: "16px",
    marginBottom: "15px",
  },
  inputDisabled: {
    padding: "10px",
    backgroundColor: "#f1f1f1",
    border: "2px solid #ccc",
    borderRadius: "6px",
    color: "#666",
    fontSize: "16px",
    marginBottom: "15px",
    cursor: "not-allowed",
  },
  button: {
    padding: "12px",
    backgroundColor: "#007bff", // Blue button
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#0056b3", // Darker blue on hover
  },
};

export default BuyForm;
