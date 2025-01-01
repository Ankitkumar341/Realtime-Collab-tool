import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotepadGrid from './components/notepad/NotepadGrid';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isLoggedIn = !!localStorage.getItem('user');
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        
        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={
              <PrivateRoute>
                <>
                  <div className="container py-5">
                    <div className="text-center mb-5">
                      <h1 className="display-4 fw-bold">Collaborative Notepad</h1>
                      <p className="lead text-muted">
                        Create, edit, and share notes in real-time with your team
                      </p>
                    </div>
                  </div>
                  <NotepadGrid />
                </>
              </PrivateRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;