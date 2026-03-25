import React, { useState } from "react";
import { useAuth } from "./hooks";
import "../../styles/LoginButton.css";

const LoginButton: React.FC = () => {
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      login(username.trim());
      setShowModal(false);
      setUsername("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <>
      <button 
        className="login-button"
        onClick={() => setShowModal(true)}
      >
        Sign In
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Welcome!</h3>
            <input
              type="text"
              className="modal-input"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
            />
            <div className="modal-buttons">
              <button 
                className="modal-button modal-button--cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="modal-button modal-button--confirm"
                onClick={handleLogin}
                disabled={!username.trim()}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginButton;