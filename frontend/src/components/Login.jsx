import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  // State variables for storing username, password, and OTP
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
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
    fetch("http://localhost:8000/sendOTP/" + email).then(resp => console.log(resp))
    setOtpSent(true);
  };

  const handleVerifyOTP = () => {
    // Dummy implementation to verify OTP
    // In a real application, you would compare the entered OTP with the OTP sent to the user's email
    // For demo purposes, let's just check if the OTP matches a hardcoded value
    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: address,
        email: email,
        password: password,
        otp: otp
      })
    })
    .then(resp => {
      if (resp.status == 200) {
        return resp.json()
      }
    })
    .then(data => {
      if (data.success == true){
        console.log("Logged in")
      }
    })
  };

  return (
    <div className="login-container"> <h2>Login</h2>
      {!loginSuccess && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Address:</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Email:</label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
