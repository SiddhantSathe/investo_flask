import { useState, useEffect } from "react";
import axios from "axios";

const CollaborationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userEmail = "madhurajangle2004@gmail.com"; // Replace with dynamic user email

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5006/get-collaboration-requests?email=${userEmail}`
        );
        setRequests(response.data);
      } catch (err) {
        setError("Failed to load collaboration requests.");
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Collaboration Requests</h2>

      {loading && <p style={styles.loading}>Loading requests...</p>}
      {error && <p style={styles.error}>{error}</p>}

      {!loading && !error && requests.length === 0 ? (
        <p style={styles.noData}>No collaboration requests found.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Sender</th>
              <th>Sender Authority</th>
              <th>Your Authority</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr key={index}>
                <td>{req.sender_email}</td>
                <td>{req.sender_authority}%</td>
                <td>{req.receiver_authority}%</td>
                <td>{req.message}</td>
                <td style={req.status === "pending" ? styles.pending : styles.accepted}>
                  {req.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "80%",
    margin: "20px auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "15px",
  },
  loading: {
    fontSize: "18px",
    color: "#555",
  },
  error: {
    fontSize: "16px",
    color: "red",
  },
  noData: {
    fontSize: "16px",
    color: "#777",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "15px",
  },
  pending: {
    color: "orange",
    fontWeight: "bold",
  },
  accepted: {
    color: "green",
    fontWeight: "bold",
  },
};

export default CollaborationRequests;
