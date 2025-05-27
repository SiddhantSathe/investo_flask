import { useState, useEffect } from "react";
import axios from "axios";

const CollaborationRequests = ({ userEmail }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userEmail) return;

    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5006/get-collaboration-requests?email=${userEmail}`
        );
        setRequests(response.data);
      } catch (err) {
        setError("Failed to load collaboration requests.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [userEmail]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Collaboration Requests</h2>
      {loading ? (
        <p>Loading requests...</p>
      ) : error ? (
        <p style={styles.error}>{error}</p>
      ) : requests.length === 0 ? (
        <p>No collaboration requests found.</p>
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
                <td>{req.status}</td>
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
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    color: "#333",
    fontSize: "20px",
    marginBottom: "10px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  },
  error: {
    color: "red",
  },
};

export default CollaborationRequests;
