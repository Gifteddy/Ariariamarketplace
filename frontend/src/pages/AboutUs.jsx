import React from 'react';
import FooterNav from '../components/Layout/FooterNav';

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
        {/* About Ariaria Marketplace */}
        <section style={styles.aboutSection}>
          <h2 style={styles.sectionTitle}>About Ariariamarketplace.com.ng</h2>
          <p style={styles.sectionText}>
            <strong>Ariariamarketplace.com.ng</strong> is managed by Abanaijamade Ecart Ltd, with its corporate office located at No. 206 Faulks Road by Samek Junction, Aba, Abia State, Nigeria. This online multivendor marketplace allows vendors and wholesalers in Ariaria market and beyond to display over 1,000,000 quality products, including fashion, cosmetics, electronics, food & beverages, furniture, and more. Customers worldwide can access and purchase wholesale products with ease. The platform connects serious buyers with wholesalers, who fulfill and deliver their orders promptly.
          </p>
        </section>

        {/* Our Mission Section */}
        <section style={styles.missionSection}>
          <h2 style={styles.sectionTitle}>Our Mission</h2>
          <p style={styles.sectionText}>
            To connect wholesalers in Ariaria International Market with customers worldwide, ensuring trust and product satisfaction. We bring together buyers, producers, and suppliers on one platform, eliminating the risks of long-distance travel by allowing customers to easily reach wholesalers online and receive their products quickly.
          </p>
        </section>

        {/* Core Values */}
        <section style={styles.coreValuesSection}>
          <h2 style={styles.sectionTitle}>Our Core Values</h2>
          <ul style={styles.offerList}>
            <li style={styles.offerItem}><strong>Quality Assurance:</strong> We ensure high-quality products from certified sellers.</li>
            <li style={styles.offerItem}><strong>Integrity & Honesty:</strong> Transparency in all transactions.</li>
            <li style={styles.offerItem}><strong>Commitment to Excellence:</strong> We strive to be leaders in the eCommerce industry.</li>
            <li style={styles.offerItem}><strong>Customer Relationship:</strong> Building strong, trust-based relationships with customers.</li>
          </ul>
        </section>

        {/* What We Offer Section */}
        <section style={styles.offerSection}>
          <h2 style={styles.sectionTitle}>What We Offer</h2>
          <ul style={styles.offerList}>
            <li style={styles.offerItem}><strong>Wide Product Range:</strong> From fashion to electronics, home essentials, and personal care, we offer everything you need.</li>
            <li style={styles.offerItem}><strong>Professional Wholesalers:</strong> We collaborate with verified wholesalers and SMEs from Aba and across Nigeria.</li>
            <li style={styles.offerItem}><strong>Global Access:</strong> Shop from anywhere in the world with guaranteed access.</li>
            <li style={styles.offerItem}><strong>Multiple Payment Options:</strong> Enjoy flexibility with different payment methods available.</li>
            <li style={styles.offerItem}><strong>Efficient Delivery:</strong> We have a reliable delivery system both within and outside Nigeria.</li>
          </ul>
        </section>

        {/* Why Shop with Us Section */}
        <section style={styles.whySection}>
          <h2 style={styles.sectionTitle}>Why Shop with Ariaria Marketplace?</h2>
          <p style={styles.sectionText}>
            Ariariamarketplace.com.ng is not just an online store—it's a platform designed to provide seamless, efficient communication between buyers, producers, and suppliers. Our website ensures access to high-quality, trendy products at affordable prices, with quick shipments and deliveries.
          </p>
          <div style={styles.benefitsGrid}>
            <div style={styles.benefitItem}>
              <h3 style={styles.benefitTitle}>Variety of Products</h3>
              <p style={styles.benefitText}>Browse through over 1,000,000 products in various categories.</p>
            </div>
            <div style={styles.benefitItem}>
              <h3 style={styles.benefitTitle}>Verified Sellers</h3>
              <p style={styles.benefitText}>Only certified and professional sellers can sell on our platform.</p>
            </div>
            <div style={styles.benefitItem}>
              <h3 style={styles.benefitTitle}>24/7 Availability</h3>
              <p style={styles.benefitText}>Our platform is available anytime, anywhere, offering uninterrupted service.</p>
            </div>
            <div style={styles.benefitItem}>
              <h3 style={styles.benefitTitle}>Guaranteed Satisfaction</h3>
              <p style={styles.benefitText}>We ensure that all our customers get high-quality products that meet their needs.</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Ready to Experience the Future of Shopping?</h2>
          <p style={styles.ctaText}>
            Join Ariaria Marketplace today, and enjoy a smarter way to shop. Discover unbeatable deals and a wide variety of quality products!
          </p>
          <a href="/products" style={styles.ctaButton}>
            Shop Now
          </a>
        </section>
      </div>
      <FooterNav />
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
