import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"; // For extracting email from URL
import "../styles/profile.css";
import { AuthContext } from "../context/AuthContext";
import { WalletContext } from "../context/WalletContext"; // Import Wallet Context
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const navigate = useNavigate();
  const { walletBalance, setWalletBalance } = useContext(WalletContext);
  const { email } = useParams(); // Extract email from URL
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    dob: "",
    location: "",
    postalCode: "",
    gender: "",
    Name: "",
    walletBalance: "", // New Wallet Balance field
  });

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/profile/${user}`);
        const data = await response.json();

        if (data.status === "success") {
          setProfileData({
            firstName: data.data.username.split(" ")[0] || "",
            lastName: data.data.username.split(" ")[1] || "",
            Name: data.data.username,
            email: data.data.email,
            address: data.data.address || "",
            phone: data.data.phone_number || "",
            dob: data.data.age || "",
            location: data.data.city || "",
            postalCode: data.data.postal_code || "",
            gender: data.data.gender || "",
            walletBalance: data.data.wallet_balance || "0", // Store wallet balance
          });
          setWalletBalance(data.data.wallet_balance || "0");
        } else {
          console.error("Profile not found");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [email,  setWalletBalance]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/profile/${user}`, {  // ✅ Removed extra comma
        method: "PATCH",  // ✅ Correct method for partial updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: profileData.name,
          phone_number: profileData.phone,
          location: profileData.location,
          wallet_balance: profileData.walletBalance,  // ✅ Ensure correct field names
        }),
      });
    
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    
      const data = await response.json();
      console.log("Profile updated successfully:", data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    
  //     const data = await response.json();
  
  //     if (data.status === "success") {
  //       alert("Profile updated successfully! ✅");
  //       setIsEditing(false);  // Exit edit mode
  //     } else {
  //       alert("Failed to update profile ❌");
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //     alert("An error occurred while updating the profile ❌");
  //   };
  };
  
  const handleDiscardChanges = () => setIsEditing(false);

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Personal Information</h2>
        <div className="profile-section">
          <img
            src="https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg"
            alt="Profile"
            className="profile-pic"
          />
          <h3>{profileData.firstName} {profileData.lastName}</h3>
        </div>

        {/* Profile Form - Two Rows */}
        <div className="form-grid">
          <div className="form-row">
            <div className="input-group">
              <label>Name</label>
              <input type="text" name="Name" value={profileData.Name} disabled={!isEditing} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={profileData.email} disabled />
              <span className="verified">✔ Verified</span>
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Phone Number</label>
              <input type="text" name="phone" value={profileData.phone} disabled={!isEditing} onChange={handleInputChange} />
            </div>

            <div className="input-group">
              <label>Wallet Balance</label>
              <input type="text" name="walletBalance" value={profileData.walletBalance} disabled={!isEditing} onChange={handleInputChange} />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label>Location</label>
              <input type="text" name="location" value={profileData.location} disabled={!isEditing} onChange={handleInputChange} />
            </div>

            
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          {!isEditing ? (
            <button className="edit-btn" onClick={handleEditClick}>Edit</button>
          ) : (
            <>
              <button className="discard-btn" onClick={handleDiscardChanges}>Discard Changes</button>
              <button className="save-btn" onClick={handleSaveChanges}>Save Changes</button>
            </>
          )}
        </div>

        {/* Collaboration Section */}
        <nav className="collaboration">
          <h2>Collaboration</h2>
          <button className="active" onClick={() => navigate("/collabform")}>Create Collaboration</button>
          <button>Login & Password</button>
          <button>Log Out</button>
        </nav>
      </div>
    </div>
  );
};

export default Profile;
