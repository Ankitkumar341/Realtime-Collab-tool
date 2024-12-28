import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        const userName = response.data.name;
        const jwtToken = response.data.jwtToken;
        localStorage.setItem('user', JSON.stringify({ name: userName, token: jwtToken }));
        toast.success(`Welcome, ${userName}! Login successful`);
        
      
        const loginEvent = new CustomEvent('login', { detail: { name: userName } });
        window.dispatchEvent(loginEvent);

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          toast.error('Invalid email or password');
        } else if (error.response?.status === 500) {
          toast.error('Internal server error. Please try again.');
        } else {
          toast.error('An error occurred during login. Please try again.');
        }
      } else {
        console.error('Login error:', error);
        toast.error('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card shadow-lg p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="text-center mb-4">
          <LogIn className="h1 text-primary mb-3" />
          <h2 className="h4 font-weight-bold">Welcome back</h2>
          <p className="text-muted">Please sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text">
                <Mail className="text-muted" />
              </span>
              <input
                id="email"
                placeholder="Enter your email"
                type="email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <Lock className="text-muted" />
              </span>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="form-control"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                id="remember"
                className="form-check-input"
              />
              <label htmlFor="remember" className="form-check-label small text-muted">
                Remember me
              </label>
            </div>
            <a href="#" className="text-primary small">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign in
          </button>
        </form>

        <div className="mt-4 text-center small">
          <span className="text-muted">Don't have an account?</span>{' '}
          <Link to="/signup" className="text-primary fw-semibold">
            Sign up
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
