import { useState , useContext } from "react";
import axios from "axios"; // Import Axios
import logo from "../assets/images/rough.png";
import { AuthContext } from "../context/AuthContext";
const UserAuthForm = () => {
  const [formData, setFormData] = useState({
    sender_email: "",
    receiver_email: "",
    sender_authority: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = name.includes("authority") ? value.replace(/\D/, "") : value;
    setFormData({ ...formData, [name]: updatedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const senderAuthority = parseInt(formData.sender_authority) || 0;
    const receiverAuthority = 100 - senderAuthority;

    if (senderAuthority + receiverAuthority !== 100) {
      alert("Sender and receiver authority must sum up to 100.");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5006/send-collaboration-request", {
        ...formData,
        receiver_authority: receiverAuthority,
      });

      alert("Collaboration Request Sent Successfully!");

      // Reset form fields
      setFormData({
        sender_email: "",
        receiver_email: "",
        sender_authority: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error.response?.data);
      alert("Failed to send collaboration request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.outercontainer}>
      <div style={styles.container}>
        <div style={styles.card}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <h2 style={styles.title}>Collaboration Form</h2>
          <div style={styles.profileBox}>
            <img src={logo} alt="User Avatar" style={styles.avatar} />
            <p style={styles.username}>
              Signed in as <b>{user}</b>
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Your Email</label>
            <input type="email" name="sender_email" value={formData.sender_email} onChange={handleChange} required style={styles.input} />

            <label style={styles.label}>Collaborator's Email</label>
            <input type="email" name="receiver_email" value={formData.receiver_email} onChange={handleChange} required style={styles.input} />

            <label style={styles.label}>Your Authority Value</label>
            <input type="number" name="sender_authority" value={formData.sender_authority} onChange={handleChange} required min="0" max="100" style={styles.input} />

            <label style={styles.label}>Partner's Authority Value</label>
            <input type="number" value={100 - (parseInt(formData.sender_authority) || 0)} disabled style={styles.inputDisabled} />

            <label style={styles.label}>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required style={styles.input}></textarea>

            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? "Sending..." : "Invite Collaborator"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  outercontainer: { width: "80vw" },
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f9f9f9" },
  card: { width: "400px", padding: "24px", backgroundColor: "#ffffff", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", textAlign: "center", border: "1px solid #ddd" },
  logo: { width: "50px", marginBottom: "10px" },
  title: { color: "#000", fontSize: "18px", marginBottom: "20px" },
  form: { display: "flex", flexDirection: "column" },
  label: { color: "#333", fontSize: "14px", textAlign: "left" },
  input: { padding: "10px", backgroundColor: "#ffffff", border: "1px solid #ccc", borderRadius: "6px", color: "#000", marginBottom: "15px" },
  inputDisabled: { padding: "10px", backgroundColor: "#f1f1f1", border: "1px solid #ccc", borderRadius: "6px", color: "#666", marginBottom: "15px", cursor: "not-allowed" },
  button: { padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "16px" },
};

export default UserAuthForm;
