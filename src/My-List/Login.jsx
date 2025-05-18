import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Get users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  // Save new user to localStorage
  const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  };

  // Find user by email
  const findUserByEmail = (email) => {
    const users = getUsers();
    return users.find((user) => user.email === email);
  };

  // Simple email validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearMessages();

    // Basic validations
    if (!email.trim() || !password.trim() || (!isLogin && !name.trim())) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (isLogin) {
        const user = findUserByEmail(email);
        if (!user) {
          setErrorMessage('User not found. Please sign up.');
          setIsLoading(false);
          return;
        }
        if (user.password !== password) {
          setErrorMessage('Incorrect password.');
          setIsLoading(false);
          return;
        }

        setSuccessMessage(`🎉 Welcome back, ${user.name || 'User'}!`);
        setIsLoading(false);
        setTimeout(() => {
          console.log('Calling onLogin callback...');
          onLogin(); // Switch to Todo page
        }, 1500);
      } else {
        if (findUserByEmail(email)) {
          setErrorMessage('Email already registered. Please login.');
          setIsLoading(false);
          return;
        }
        saveUser({ name, email, password });
        setSuccessMessage('🎉 Account Created Successfully! You can now log in.');
        setIsLoading(false);
        setIsLogin(true);
        setName('');
        setEmail('');
        setPassword('');
      }
    }, 1500);
  };

  const handleSocialLogin = (platform) => {
    alert(`Sign in with ${platform} coming soon!`);
  };

  // Clear messages on input change
  const handleInputChange = (setter) => (e) => {
    clearMessages();
    setter(e.target.value);
  };

  return (
    <div className="todo-box responsive-box">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

      <div className="social-buttons">
        <button onClick={() => handleSocialLogin('Google')} className="social-btn google">Sign in with Google</button>
        <button onClick={() => handleSocialLogin('Facebook')} className="social-btn facebook">Sign in with Facebook</button>
        <button onClick={() => handleSocialLogin('Twitter')} className="social-btn twitter">Sign in with Twitter</button>
      </div>

      <form onSubmit={handleSubmit} className="responsive-form">
        {!isLogin && (
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={handleInputChange(setName)}
            autoComplete="name"
          />
        )}
        <input
          type="email"
          placeholder={isLogin ? 'Enter your email' : 'Create your email'}
          value={email}
          onChange={handleInputChange(setEmail)}
          autoComplete={isLogin ? 'username' : 'email'}
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={isLogin ? 'Enter your password' : 'Create a password'}
            value={password}
            onChange={handleInputChange(setPassword)}
            autoComplete={isLogin ? 'current-password' : 'new-password'}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit" className="button responsive-button" disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : (isLogin ? 'Login' : 'Sign Up')}
        </button>
      </form>

      {successMessage && (
        <p className="success-message">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}

      <p className="switch-container">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            clearMessages();
            setName('');
            setEmail('');
            setPassword('');
          }}
          className="switch responsive-switch"
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default Login;
