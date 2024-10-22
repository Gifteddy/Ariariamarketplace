import React from 'react';

const AboutUs = () => {
  return (
    <div style={styles.aboutUsContainer}>
      {/* Banner Section */}
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>Welcome to</h1>
        <h1 style={styles.bannerMainTitle}>ARIARIA MARKETPLACE</h1>
        <p style={styles.bannerSubtitle}>
        Shop Smartly, Elevate Your Lifestyle. Welcome to the Future of Online Shopping!
        </p>
      </div>

      {/* Main About Us Content */}
      <div style={styles.contentSection}>
        {/* Our Mission Section */}
        <section style={styles.missionSection}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.sectionText}>
            At <strong>Ariaria Marketplace</strong>, we are revolutionizing the way people shop online. Our mission is to bring you a curated, smart, and enjoyable shopping experience that saves you time, enhances your lifestyle, and provides unbeatable value.
          </p>
        </section>

        {/* What We Offer Section */}
        <section style={styles.offerSection}>
          <h2 style={styles.sectionTitle}>What We Offer</h2>
          <ul style={styles.offerList}>
            <li style={styles.offerItem}>
              <strong>Wide Product Range:</strong> From fashion and electronics to home essentials and personal care, we have it all.
            </li>
            <li style={styles.offerItem}>
              <strong>Exclusive Deals & Discounts:</strong> Enjoy unbeatable prices and special offers on top products.
            </li>
            <li style={styles.offerItem}>
              <strong>Trusted Sellers:</strong> We partner with verified and trusted sellers to guarantee quality and satisfaction.
            </li>
            <li style={styles.offerItem}>
              <strong>Fast & Reliable Delivery:</strong> Get your products delivered quickly and safely to your doorstep.
            </li>
            <li style={styles.offerItem}>
              <strong>Customer-Centric Service:</strong> Our dedicated customer support is always here to help you.
            </li>
          </ul>
        </section>

        {/* Why Shop with Us Section */}
        <section style={styles.whySection}>
          <h2 style={styles.sectionTitle}>Why Shop with Ariaria Marketplace?</h2>
          <p style={styles.sectionText}>
            Ariaria Marketplace is not just another online store—it's a community where we prioritize your needs and lifestyle. Our user-friendly platform, smart shopping tools, and passionate team are committed to helping you discover products that fit your unique taste and budget.
          </p>
          <div style={styles.benefitsGrid}>
            <div style={styles.benefitItem}>
              <h3 style={styles.benefitTitle}>Smart Shopping</h3>
              <p style={styles.benefitText}>Make informed choices with detailed product descriptions, reviews, and comparisons.</p>
            </div>
            <div style={styles.benefitItem}>
              <h3 style={styles.benefitTitle}>Trusted by Millions</h3>
              <p style={styles.benefitText}>Join a community of savvy shoppers who trust Ariaria Marketplace for quality and value.</p>
            </div>
            <div style={styles.benefitItem}>
              <h3 style={styles.benefitTitle}>Seamless Experience</h3>
              <p style={styles.benefitText}>Shop effortlessly across all devices with our responsive design and intuitive interface.</p>
            </div>
            <div style={styles.benefitItem}>
              <h3 style={styles.benefitTitle}>Sustainability</h3>
              <p style={styles.benefitText}>We promote eco-friendly products and sustainable business practices for a better future.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={styles.ctaSection}>
  <h2 style={styles.ctaTitle}>Ready to Experience the Future of Shopping?</h2>
  <p style={styles.ctaText}>
    Start exploring the best products, unbeatable deals, and a smarter way to shop. Join the Ariaria Marketplace community today!
  </p>
  <a href="/products" style={styles.ctaButton}>
    Shop Now
  </a>
</section>

      </div>
    </div>
  );
};

// Inline styles
const styles = {
  aboutUsContainer: {
    padding: 0,
    margin: 0,
    fontFamily: 'Roboto, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  // Banner Styling
  banner: {
    background: 'linear-gradient(145deg, rgba(0, 102, 255, 0.8), rgba(0, 153, 51, 0.9)), url("/path/to/banner-image.jpg") center/cover no-repeat',
    textAlign: 'center',
    color: '#fff',
    padding: '60px 20px',
    boxShadow: 'inset 0 0 2000px rgba(0, 0, 0, 0.5)',
    position: 'relative',
  },
  bannerTitle: {
    fontSize: '28px',
    fontWeight: 300,
    marginBottom: 0,
  },
  bannerMainTitle: {
    fontSize: '48px',
    fontWeight: 700,
    marginTop: 0,
  },
  bannerSubtitle: {
    fontSize: '16px',
    fontWeight: 400,
    marginTop: '20px',
  },
  // Content Section
  contentSection: {
    padding: '40px 20px',
    marginTop: '20px',
  },
  // Section Styling
  sectionTitle: {
    fontSize: '28px',
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: '20px',
    color: '#0066cc',
  },
  sectionText: {
    fontSize: '16px',
    lineHeight: 1.6,
    textAlign: 'center',
    marginBottom: '40px',
  },
  missionSection: {
    marginBottom: '60px',
  },
  offerSection: {
    marginBottom: '60px',
  },
  // What We Offer List
  offerList: {
    listStyleType: 'none',
    padding: 0,
    textAlign: 'center',
  },
  offerItem: {
    fontSize: '16px',
    margin: '10px 0',
    color: '#333',
  },
  // Why Shop With Us - Grid Layout
  benefitsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginTop: '40px',
  },
  benefitItem: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  benefitTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    fontWeight: 600,
  },
  benefitText: {
    fontSize: '14px',
    color: '#555',
  },
  // Call to Action
  ctaSection: {
    textAlign: 'center',
    background: 'linear-gradient(135deg, #008dff, #66cc66)',
    color: '#fff',
    padding: '40px 20px',
    borderRadius: '15px',
    marginTop: '20px',
  },
  ctaTitle: {
    fontSize: '28px',
    fontWeight: 700,
    marginBottom: '20px',
  },
  ctaText: {
    fontSize: '16px',
    marginBottom: '30px',
  },
  ctaButton: {
    fontSize: '18px',
    padding: '12px 30px',
    backgroundColor: '#fff',
    color: '#004eae',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  },
};

// Responsive Styles
const responsiveStyles = {
  '@media (max-width: 768px)': {
    bannerTitle: {
      fontSize: '24px',
    },
    bannerMainTitle: {
      fontSize: '36px',
    },
    bannerSubtitle: {
      fontSize: '14px',
    },
    sectionTitle: {
      fontSize: '24px',
    },
    sectionText: {
      fontSize: '14px',
    },
    benefitTitle: {
      fontSize: '18px',
    },
    ctaTitle: {
      fontSize: '24px',
    },
    ctaText: {
      fontSize: '14px',
    },
  },
  '@media (max-width: 480px)': {
    bannerTitle: {
      fontSize: '20px',
    },
    bannerMainTitle: {
      fontSize: '30px',
    },
    bannerSubtitle: {
      fontSize: '12px',
    },
  },
};

export default AboutUs;
