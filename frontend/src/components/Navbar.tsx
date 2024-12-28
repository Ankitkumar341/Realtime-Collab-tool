import React, { useState, useEffect } from 'react';
import { Search, User, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.token) {
      setIsLoggedIn(true);
      setUserName(user.name);
    }

    
    const handleLogin = (event: CustomEvent) => {
      setIsLoggedIn(true);
      setUserName(event.detail.name);
    };

    window.addEventListener('login', handleLogin as EventListener);

    return () => {
      window.removeEventListener('login', handleLogin as EventListener);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">REAL TIME COLLAB TOOL</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsNavCollapsed(!isNavCollapsed)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/services">Services</Link>
            </li>
          </ul>

          <form className="d-flex me-3">
            <div className="input-group">
              <input 
                className="form-control" 
                type="search" 
                placeholder="Search" 
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                <Search size={18} />
              </button>
            </div>
          </form>

          {isLoggedIn ? (
            <div className="d-flex gap-2 align-items-center">
              <span className="navbar-text">Welcome, {userName}</span>
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <User size={18} />
                </button>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                  <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-primary d-flex align-items-center gap-1">
                <LogIn size={18} />
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary d-flex align-items-center gap-1">
                <User size={18} />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;