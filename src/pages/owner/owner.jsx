import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

function OwnerAuthPage() {
  const [isLogin, setIsLogin] = useState(true); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate(); 

  const toggleView = () => {
    console.log('Toggling view: ', isLogin ? 'Switching to Sign Up' : 'Switching to Login');
    
   
    
    setIsLogin(!isLogin); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted: ', { name, email, password, phone });
    
    if (isLogin) {
      
      axios
        .post('http://localhost:5000/owner/login', {
          email,
          password,
        })
        .then((res) => {
          console.log('Login Successful', res.data);
          navigate('/destinations'); 
        })
        .catch((err) => {
          console.error('Login Error:', err);
        });
    } else {
      
      axios
        .post('http://localhost:5000/owner/signup', {
          name,
          email,
          password,
          phone,
        })
        .then((res) => {
          console.log('Signup Successful', res.data);
          
           setName('');
           setEmail('');
           setPassword('');
           setPhone('');
           setIsLogin(isLogin)
        })
        .catch((err) => {
          console.error('Signup Error:', err);
        });
    }
  };

  return (
    <StyledWrapper>
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <p onClick={toggleView} className="toggle-view">
            {isLogin
              ? "Don't have an account? Sign up here."
              : 'Already have an account? Login here.'}
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Reset some basic styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #74ebd5, #acb6e5);
  }

  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .auth-box {
    background-color: white;
    padding: 40px 50px;
    border-radius: 15px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }

  .auth-box h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }

  .form-group label {
    font-size: 14px;
    color: #555;
  }

  .form-group input {
    width: 100%;
    padding: 10px 12px;
    margin-top: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f7f7f7;
  }

  .form-group input:focus {
    outline: none;
    border-color: #74ebd5;
    box-shadow: 0 0 5px rgba(116, 235, 213, 0.5);
  }

  .submit-btn {
    background-color: #74ebd5;
    color: white;
    font-size: 16px;
    padding: 12px 20px;
    width: 100%;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .submit-btn:hover {
    background-color: #57d3c3;
  }

  .toggle-view {
    margin-top: 20px;
    color: #555;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .toggle-view:hover {
    color: #333;
  }
`;

export default OwnerAuthPage;
