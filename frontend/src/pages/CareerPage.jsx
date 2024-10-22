import React from 'react';

const CareerPage = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4' }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Join Our Team</h1>
      <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '18px' }}>
        Discover exciting career opportunities at Ariaria Marketplace.
      </p>

      <h2 style={{ color: '#27ae60' }}>Current Openings</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Job Listing */}
        <div style={jobCardStyle}>
          <h3 style={{ color: '#2980b9' }}>Product Manager</h3>
          <p>Location: Remote</p>
          <p>Experience: 3+ years</p>
          <p>Job Type: Full-Time</p>
          <button style={applyButtonStyle}>Apply Now</button>
        </div>

        <div style={jobCardStyle}>
          <h3 style={{ color: '#2980b9' }}>Software Engineer</h3>
          <p>Location: Remote</p>
          <p>Experience: 2+ years</p>
          <p>Job Type: Full-Time</p>
          <button style={applyButtonStyle}>Apply Now</button>
        </div>

        <div style={jobCardStyle}>
          <h3 style={{ color: '#2980b9' }}>Marketing Specialist</h3>
          <p>Location: Remote</p>
          <p>Experience: 2+ years</p>
          <p>Job Type: Full-Time</p>
          <button style={applyButtonStyle}>Apply Now</button>
        </div>
      </div>

      <h2 style={{ color: '#27ae60', marginTop: '40px' }}>Why Work With Us?</h2>
      <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '18px', maxWidth: '600px', margin: 'auto' }}>
        At Ariaria Marketplace, we believe in fostering a collaborative environment where innovation thrives.
        Join us to be part of a diverse team dedicated to shaping the future of online shopping.
      </p>

      <h2 style={{ color: '#27ae60', marginTop: '40px' }}>How to Apply</h2>
      <p style={{ textAlign: 'center', color: '#7f8c8d', fontSize: '18px', maxWidth: '600px', margin: 'auto' }}>
        To apply for any of the above positions, please fill out the form below:
      </p>

      {/* Application Form */}
      <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', color: '#2980b9' }}>Application Form</h2>
        <form>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Full Name:</label>
            <input type="text" style={inputStyle} required />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email:</label>
            <input type="email" style={inputStyle} required />
          </div>
          <div style={formGroupStyle}>
            <label style={labelStyle}>Resume:</label>
            <input type="file" style={inputStyle} required />
          </div>
          <div style={formGroupStyle}>
            <button type="submit" style={submitButtonStyle}>Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles
const jobCardStyle = {
  backgroundColor: '#ffffff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '20px',
  margin: '10px 0',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
  width: '100%',
  maxWidth: '400px',
};

const applyButtonStyle = {
  backgroundColor: '#27ae60',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

const formGroupStyle = {
  margin: '15px 0',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const submitButtonStyle = {
  backgroundColor: '#2980b9',
  color: '#fff',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default CareerPage;
