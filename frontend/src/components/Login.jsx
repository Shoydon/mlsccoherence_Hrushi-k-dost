import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  // State variables for storing username, password, and OTP
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Proceed to submit data to the database
    const formData = {
      username: username,
      password: password
    };
    // Submit formData to the database
    console.log("Submitting data:", formData);
    // Show login success pop-up or navigate to another page
    setLoginSuccess(true);
    // alert("Login Successful!");
  };

  const handleSendOTP = () => {
    // Dummy implementation to send OTP to the user's email
    // In a real application, you would integrate with your backend to send OTP via email
    // For demo purposes, let's just set otpSent to true
    setOtpSent(true);
  };

  const handleVerifyOTP = () => {
    // Dummy implementation to verify OTP
    // In a real application, you would compare the entered OTP with the OTP sent to the user's email
    // For demo purposes, let's just check if the OTP matches a hardcoded value
    const hardcodedOTP = "1234"; // Hardcoded OTP for demo
    if (otp === hardcodedOTP) {
      handleSubmit(); // Execute login process
      console.log("OTP verified successfully");
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {!loginSuccess && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {otpSent && (
            <div className="form-group">
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          {otpSent ? (
            <button type="button" onClick={handleVerifyOTP}>Login</button>
          ) : (
            <button type="button" onClick={handleSendOTP}>Send OTP</button>
          )}
        </form>
      )}
      {loginSuccess }
    </div>
  );
};

export default Login;
