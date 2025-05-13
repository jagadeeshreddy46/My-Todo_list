import React, { useState } from 'react';
import Login from './My-List/Login';  // Correct path
import Todo from './My-List/Todo';  
import './App.css'
  // Correct path

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="App">
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
             <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        )}
      </div>

      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Todo onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
