import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button';
function Nav() {
  const [formdata, setFormadata] = useState({});
  const [token, setToken] = useState('');
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  const handleNavbarClose = () => {
    if (isNavbarOpen) {
      setIsNavbarOpen(false);
    }
  };

  const handleLogout = () => {

    localStorage.removeItem('Token');
    navigate("/");

  };

  useEffect(() => {
    setToken(localStorage.getItem('Token'));
  }, []);

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = () => {
    const token = localStorage.getItem('Token');
    if (token) {
      axios
        .post('http://localhost:3001/validateToken', { token })
        .then((response) => {
          setFormadata(response.data.user);
          console.log('Response:', response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="backk">
      <nav className="navbar navbar-expand-lg backk  bg-white container">
        <div className="container-fluid ">
          <Link to="/" className="navbar-brand titlee text-white " onClick={handleNavbarClose}>
            Documate
          </Link>
          <button
            className={`navbar-toggler ${isNavbarOpen ? 'navbar-toggler-open' : ''}`}
            type="button"
            data-bs-target="#navbarSupportedContent"
            style={{ color: 'white', backgroundColor: 'lightblue' }}
            onClick={handleNavbarToggle}
            aria-controls="navbarSupportedContent"
            aria-expanded={isNavbarOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-end">

              <li className="nav-item text-start">
                <Link to="/Aboutus" className=" nav-link active text-white" onClick={handleNavbarClose}>
                  About us
                </Link>
              </li>
              <li className="nav-item text-start">
                <Link to="/Features" className="  nav-link active text-white" onClick={handleNavbarClose}>
                  Features
                </Link>
              </li>
              <li className="nav-item text-start">
                <Link to="/contactus" className=" nav-link active text-white" onClick={handleNavbarClose}>
                  Contact us
                </Link>
              </li>
            </ul>
            <ui>
              <Link to="/signup"><Button severity="primary" className="mx-1">Register</Button></Link>
              <Link to="/login"><Button severity="info" className="mx-1">Login</Button></Link>
            </ui>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
