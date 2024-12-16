import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faStar, faUser } from '@fortawesome/free-solid-svg-icons';

const FooterNav = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the environment is client-side before accessing the window object
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile(); // Set initial state
    window.addEventListener('resize', checkMobile); // Update on resize

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []); // Run once on mount

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const navStyle = {
    display: isMobile ? 'flex' : 'none', // Only show on mobile
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
    transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
    transition: 'transform 0.3s ease-in-out',
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

  return (
    <div style={navStyle}>
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
  );
};

export default FooterNav;
