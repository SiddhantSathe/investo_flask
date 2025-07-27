import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/SignupForm.css";

const SignupForm = () => {
  const navigate = useNavigate(); // Initialize navigation
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone_number: "",
    age: "",
    city: "",
    gender: "",
    risk_profile: "Low",
    pan_card: null,
    aadhaar_card: null,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: {
          "Accept": "application/json",
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Document verification failed.");
      }

      console.log("Signup successful:", data);
      setSuccess("Signup successful! Redirecting...");

      // Redirect to /dashboard after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      console.error("Signup failed:", err.message);
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-submit if step is 3 and user is valid
  useEffect(() => {
    if (step === 3 && formData.pan_card && formData.aadhaar_card) {
      handleSubmit(new Event("submit"));
    }
  }, [step]);

  const progressPercentage = (step / 3) * 100;

  return (
    <div style={{ width: "80vw" }}>
      <div className="signup-page">
        <div className="signup-card">
          <div className="card-header">
            <h2 className="card-title">Investo Signup</h2>
            <p className="card-description">Create your account to start investing</p>

            <div className="progress-container">
              <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <div className="step-indicators">
              <span className={step >= 1 ? "active" : ""}>Account</span>
              <span className={step >= 2 ? "active" : ""}>Profile</span>
              <span className={step >= 3 ? "active" : ""}>Documents</span>
            </div>
          </div>

          {error && (
            <div className="alert error">
              <p>{error}</p>
            </div>
          )}

          {success && (
            <div className="alert success">
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="card-content">
              {step === 1 && (
                <div className="form-step">
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      name="username"
                      placeholder=""
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder=""
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder=""
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <div className="form-group">
                    <label htmlFor="phone_number">Phone Number</label>
                    <input
                      id="phone_number"
                      name="phone_number"
                      placeholder=""
                      value={formData.phone_number}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      placeholder=""
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      name="city"
                      placeholder=""
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select 
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="risk_profile">Risk Profile</label>
                    <select 
                      id="risk_profile"
                      name="risk_profile"
                      value={formData.risk_profile}
                      onChange={handleChange}
                      required
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-step">
                  <div className="form-group">
                    <label htmlFor="pan_card">PAN Card</label>
                    <input
                      id="pan_card"
                      name="pan_card"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="aadhaar_card">Aadhaar Card</label>
                    <input
                      id="aadhaar_card"
                      name="aadhaar_card"
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="card-footer">
              {step > 1 && (
                <button type="button" className="btn btn-outline" onClick={prevStep} disabled={isSubmitting}>
                  Back
                </button>
              )}

              {step < 3 ? (
                <button type="button" className="btn btn-primary" onClick={nextStep}>
                  Next
                </button>
              ) : (
                !isSubmitting && (
                  <button type="submit" className="btn btn-primary">
                    Complete Registration
                  </button>
                )
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
