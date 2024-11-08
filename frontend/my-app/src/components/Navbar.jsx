import React from 'react';
import './css/Navbar.css'; // Import the CSS file for styling
import logo from '../assets/images/logo.png';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const user = useSelector(state => state.user);

  const handleLogout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Adjust the path as needed

    // Redirect to the login page or home page
    window.location.href = '/login';
    console.log("Logout clicked");
  };

  const handleLiked = () => {
    // Navigate to liked items
    window.location.href = '/liked';
    console.log("Liked clicked");
  };
  

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      {/* Links */}
      <ul className="nav-links">
        {/* Conditionally render Signup and Login links */}
        {!user || Object.keys(user).length === 0 ? (
          <>
            <li>
              <a href="/signup">Signup</a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>
          </>
        ) : (
          <>
            {/* Links visible only when user is logged in */}
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/chat">AI Bot</a>
            </li>
          </>
        )}
      </ul>

      <div className="profile-menu">
  {user && Object.keys(user).length > 0 && (
    <>
      <span role="img" aria-label="profile" className="avatar">
      👨‍💻
      </span>
      <div className="dropdown">
        <div className="dropdown-content">
          <div onClick={handleLogout}>Logout</div>
        </div>
      </div>
    </>
  )}
</div>

    </nav>
  );
};

export default Navbar;
