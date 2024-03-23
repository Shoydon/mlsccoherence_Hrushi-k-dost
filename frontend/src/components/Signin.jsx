import React, { useState } from 'react';
import './Signin.css'; // Import CSS file for styling

const Signin = () => {
  // State variables for storing form data
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [pan, setPan] = useState('');
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [signinSuccess, setSigninSuccess] = useState(false);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Create JSON object with form data
    const formData = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword
    };
    // Here you can perform further actions like sending data to a server
    console.log("Submitting form data:", formData);
    setSigninSuccess(true);
  };

  // Function to send OTP to the user's email
  const handleSendOTP = () => {
    // Dummy implementation to send OTP to the user's email
    // In a real application, you would integrate with your backend to send OTP via email
    // For demo purposes, let's just set otpSent to true
    let url = "http://localhost:8000/sendOTP/" + email
    fetch(url).then((resp) => console.log(resp))
    setOtpSent(true);
    // You would typically send OTP to the user's email here
    // You may call an API endpoint to send the OTP
    // Upon successful sending of OTP, set otpSent to true
  };

  // Function to verify OTP and submit the form data
  const handleSignin = () => {
    // Dummy implementation to verify OTP
    // In a real application, you would compare the entered OTP with the OTP sent to the user's email
    // For demo purposes, let's just check if the OTP matches a hardcoded value
    const hardcodedOTP = "1234"; // Hardcoded OTP for demo
    // fetch("http://localhost:8000/signin", {
    //   method: "POST",
    //   body: JSON.stringify
    // })
    if (otp === hardcodedOTP) {
      handleSubmit(); // Execute signin process
      console.log("Signin successful!");
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign In</h2>
      {!signinSuccess ? (
        // <form onSubmit={handleSubmit}> {/* Bind handleSubmit function to form submission */}
        <form action='http://localhost:8000/signin' method='POST'>
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Mobile:</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="pan">Pan:</label>
            <input
              type="text"
              id="pan"
              name="pan"
              value={pan}
              onChange={(e) => setPan(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="aadhar">Aadhar:</label>
            <input
              type="text"
              id="aadhar"
              name="aadhar"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {otpSent && (
            <div className="form-group">
              <label htmlFor="otp">Enter OTP:</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
          )}
          {otpSent ? (
            <button type="submit">Sign In</button>
          ) : (
            <button type="button" onClick={handleSendOTP}>Send OTP</button>
          )}
        </form>
      ) : (
        <p>Signin successful!</p>
      )}
    </div>
  );
};

export default Signin;
