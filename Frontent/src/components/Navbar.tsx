import React, { useState } from 'react';
import { Search, User, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();

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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;