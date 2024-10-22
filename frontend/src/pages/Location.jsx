import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const LocationPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>CONTACT US</h1>
      <p style={styles.subHeader}>
        We are excited to connect with you! Visit us at our main office or reach out through our contact information below.
      </p>

      <div style={styles.detailsContainer}>
        <div style={styles.locationCard}>
          <h2 style={styles.locationHeader}>Ariaria Marketplace</h2>
          <p style={styles.locationDetails}>
            <FaMapMarkerAlt style={styles.icon} />
            123 Market St, Suite 100<br />
            Cityville, State, 12345
          </p>
          <p style={styles.contactDetails}>
            <FaPhone style={styles.icon} /> (123) 456-7890<br />
            <FaEnvelope style={styles.icon} /> contact@ariariamarketplace.com
          </p>
        </div>
      </div>

      <h2 style={styles.mapHeader}>Find Us Here</h2>

      <div style={styles.mapContainer}>
        <iframe
          title="Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509949!2d144.95373531568392!3d-37.81720997975125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f44c6f9%3A0x7d2be86b88f2f72!2sAriaria%20Marketplace!5e0!3m2!1sen!2sng!4v1625652838973!5m2!1sen!2sng"
          width="100%"
          height="450"
          style={styles.map}
          allowFullScreen
          loading="lazy"
        />
      </div>

      <div style={styles.footer}>
        <p>We look forward to welcoming you to our marketplace!</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px', // Padding around the main container
    fontFamily: 'Arial, sans-serif',
    background: 'linear-gradient(to bottom right, rgba(240, 248, 255, 0.8), rgba(255, 255, 255, 0.8))',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#2c3e50',
    width: '100%', // Ensuring full width
    boxSizing: 'border-box', // Include padding in width calculation
  },
  header: {
    fontSize: '36px',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  subHeader: {
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '20px',
    marginBottom: '40px',
  },
  detailsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    flexWrap: 'wrap',
  },
  locationCard: {
    maxWidth: '600px',
    width: '100vw', // Allowing the card to fit full width with a max width
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.9)', // glassmorphism effect
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    margin: '0 10px', // Spacing between cards
    transition: 'transform 0.3s',
  },
  locationHeader: {
    color: '#27ae60',
    marginBottom: '20px',
    fontSize: '28px',
  },
  locationDetails: {
    color: '#34495e',
    margin: '10px 0',
    fontSize: '18px',
  },
  contactDetails: {
    color: '#34495e',
    margin: '10px 0',
    fontSize: '18px',
  },
  icon: {
    marginRight: '2px',
    color: '#27ae60',
  },
  mapHeader: {
    textAlign: 'center',
    color: '#27ae60',
    marginTop: '40px',
    fontSize: '28px',
  },
  mapContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
    width: '100vw', // Full width for the map container
  },
  map: {
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  },
  footer: {
    textAlign: 'center',
    marginTop: '30px',
    color: '#7f8c8d',
    fontSize: '16px',
  },
};

export default LocationPage;
