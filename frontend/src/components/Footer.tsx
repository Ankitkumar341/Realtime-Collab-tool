import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3 fs-2 ">About Us</h5>
            <p className="text-unmuted">
              Real Time Collab Tools
            </p>
            <div className="d-flex gap-3 mt-3 ">
              <a href="#" className="text-light"><Facebook size={20} /></a>
              <a href="#" className="text-light"><Twitter size={20} /></a>
              <a href="#" className="text-light"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/in/ankitkumar341/" className="text-light"><Linkedin size={20} /></a>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-styled  ">
              <li className="mb-2"><a href="/" className=" text-decoration-none ">Home</a></li>
              <li className="mb-2"><a href="/about" className=" text-decoration-none ">About</a></li>
              <li className="mb-2"><a href="/services" className=" text-decoration-none">Services</a></li>
              <li className="mb-2"><a href="/contact" className=" text-decoration-none">Contact</a></li>
              
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 text-unmuted">
                <MapPin size={18} className="me-2" />
                Adress
              </li>
              <li className="mb-2 text-unmuted">
                <Phone size={18} className="me-2" />
               Contact Info
              </li>
              <li className="mb-2 text-unmuted">
                <Mail size={18} className="me-2" />
                ankitkumar341.ak@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 bg-secondary" />

        <div className="text-center text-unmuted">
          <p className="mb-0">&copy; 2025 Realtime Collab App. All rights reserved.</p>
          <p className="mb-0">Thanks For Using </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;