import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.success) {
        toast.success('Signup successful');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error('User already exists. You can login.');
        } else if (error.response?.status === 500) {
          toast.error('Internal server error. Please try again.');
        } else {
          toast.error('An error occurred during signup. Please try again.');
        }
      } else {
        console.error('Signup error:', error);
        toast.error('An error occurred during signup. Please try again.');
      }
    }
  };

  return (
    <div className="min-vh-100 bg-light d-flex justify-content-center align-items-center p-4">
      <div className="card w-100" style={{ maxWidth: '400px' }}>
        <div className="card-body text-center">
          <UserPlus className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="card-title">Create an account</h1>
          <p className="text-muted mb-4">Join us today and get started</p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Label htmlFor="name">Full Name</Label>
              <div className="input-group">
                <User className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ zIndex: 1 }} />
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  type="text"
                  className="form-control ps-5"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <Label htmlFor="email">Email</Label>
              <div className="input-group">
                <Mail className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ zIndex: 1 }} />
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  className="form-control ps-5"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <Label htmlFor="password">Password</Label>
              <div className="input-group">
                <Lock className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ zIndex: 1 }} />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="form-control ps-5"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-3">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="input-group">
                <Lock className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ zIndex: 1 }} />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="form-control ps-5"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="terms"
                className="form-check-input"
                required
              />
              <label htmlFor="terms" className="form-check-label text-muted">
                I agree to the{' '}
                <a href="#" className="text-primary">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button type="submit" className="btn btn-primary w-100">
              Create Account
            </Button>
          </form>

          <div className="mt-4">
            <span className="text-muted">Already have an account? </span>
            <Link to="/login" className="text-primary">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
