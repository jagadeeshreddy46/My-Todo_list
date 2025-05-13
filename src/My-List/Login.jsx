import React, { useState, useEffect } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [fadeClass, setFadeClass] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim() && (isLogin || name.trim())) {
      setIsLoading(true);
      setSuccessMessage('');
      setTimeout(() => {
        setIsLoading(false);
        setSuccessMessage(isLogin ? '🎉 Login Successful!' : '🎉 Account Created Successfully!');
        setFadeClass('fade-in');
        onLogin(); // Replace with real auth later
      }, 2000);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => setFadeClass(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return (
    <div className="todo-box">
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder={isLogin ? 'Enter your email' : 'Create your email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={isLogin ? 'Enter your password' : 'Create a password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? <span className="spinner"></span> : (isLogin ? 'Login' : 'Sign Up')}
        </button>
      </form>

      {successMessage && <p className={`success-message ${fadeClass}`}>{successMessage}</p>}

      <p>
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="switch"
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default Login;
