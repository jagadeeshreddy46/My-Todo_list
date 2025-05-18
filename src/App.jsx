import React, { useState } from 'react';
import Login from './My-List/Login';  // Correct path
import Todo from './My-List/Todo';    // Correct path
import './App.css';                  // Correct path

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div className="App">
      {/* Logout Button at the top-right */}
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        {isLoggedIn && (
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        )}
      </div>

      {/* Conditional Rendering of Login or Todo */}
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Todo onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
