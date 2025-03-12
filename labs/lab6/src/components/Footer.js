import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="footer-content text-center">
          <p>&copy; 2025 Ethan Wheeler. All rights reserved.</p>
          <nav>
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link className="text-white" to="/">Home</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/about">About</Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-white" to="/projects">Projects</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

