import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

const FooterNav = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)',
    padding: '10px 0',
    zIndex: 1000,
  };

  const navItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#888888',
    fontSize: '14px',
    transition: 'color 0.3s ease',
  };

  const activeStyle = {
    color: '#007bff',
  };

  const iconStyle = {
    fontSize: '20px',
    marginBottom: '4px',
  };

  const containerStyle = {
    ...navStyle,
    display: 'none', // Hide by default
  };

  const mobileStyle = `
    @media (max-width: 768px) {
      .footer-nav {
        display: flex !important;
      }
    }
  `;

  return (
    <>
      <style>{mobileStyle}</style>
      <div className="footer-nav" style={containerStyle}>
        <NavLink
          to="/"
          style={({ isActive }) =>
            isActive ? { ...navItemStyle, ...activeStyle } : navItemStyle
          }
        >
          <FontAwesomeIcon icon={faHome} style={iconStyle} />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) =>
            isActive ? { ...navItemStyle, ...activeStyle } : navItemStyle
          }
        >
          <FontAwesomeIcon icon={faBox} style={iconStyle} />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/best-selling"
          style={({ isActive }) =>
            isActive ? { ...navItemStyle, ...activeStyle } : navItemStyle
          }
        >
          <FontAwesomeIcon icon={faStar} style={iconStyle} />
          <span>Best Selling</span>
        </NavLink>
        <NavLink
          to="/profile"
          style={({ isActive }) =>
            isActive ? { ...navItemStyle, ...activeStyle } : navItemStyle
          }
        >
          <FontAwesomeIcon icon={faUser} style={iconStyle} />
          <span>Profile</span>
        </NavLink>
      </div>
    </>
  );
};

export default FooterNav;
