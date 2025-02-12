import React, { useEffect, useState } from "react";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "profileImage" ? files[0] : value;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));
    
    if (name === "profileImage" && files[0]) {
      setProfileImageUrl(URL.createObjectURL(files[0]));
    }
  };

  useEffect(() => {
    setPasswordMatch(
      formData.password === formData.confirmPassword || formData.confirmPassword === ""
    );
  }, [formData.password, formData.confirmPassword]);

  useEffect(() => {
    return () => {
      if (profileImageUrl) {
        URL.revokeObjectURL(profileImageUrl);
      }
    };
  }, [profileImageUrl]);

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const register_form = new FormData();
    for (let key in formData) {
      register_form.append(key, formData[key]);
    }

    try {
      const response = await fetch("https://homyrentalserver2.onrender.com/auth/register", {
        method: "POST",
        body: register_form,
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.log("Registration failed:", errorData);
      }
    } catch (error) {
      console.log("Registration failed", error.message);
    }
  };

  return (
    <div className="register">
      <div className="register__content">
        <form className="register__content_form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && <p>Passwords do not match</p>}
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/Upload2.png" alt="Add Profile Photo" />
            <p>Upload Your photo</p>
          </label>
          {profileImageUrl && (
            <img
              src={profileImageUrl}
              alt="Profile preview"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>Register</button>
        </form>
        <a href="/login">Already have an account? Login here</a>
      </div>
    </div>
  );
};

export default RegisterPage;

