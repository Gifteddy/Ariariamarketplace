import React, { useState, useEffect } from 'react';

const ComingSoonCountdown = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showCountdown, setShowCountdown] = useState(true);

  useEffect(() => {
    if (Object.keys(timeLeft).length === 0) {
      setShowCountdown(false);
    }

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} style={styles.timerUnit}>
        {timeLeft[interval]} <span style={styles.interval}>{interval}</span>
      </span>
    );
  });

  return (
    <>
      {showCountdown ? (
        <div style={styles.overlay}>
          <div style={styles.content}>
            <h1 style={styles.heading}>Coming Soon</h1>
            {timerComponents.length ? (
              <div style={styles.countdown}>
                {timerComponents}
              </div>
            ) : (
              <span>Hurray!!! Ariariamarketplace is Live Now!</span>
            )}
          </div>
        </div>
      ) : (
        <div>
          {/* Your main content goes here */}
          <h1></h1>
        </div>
      )}
    </>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: "20px",  // Adds some padding for smaller screens
    boxSizing: "border-box",
  },
  content: {
    backdropFilter: "blur(15px)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    maxWidth: "90%",
    width: "500px",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  heading: {
    fontSize: "clamp(36px, 6vw, 48px)",  // Responsive font size
    fontWeight: "bold",
    marginBottom: "30px",
    animation: "fadeIn 2s ease-in-out",
  },
  countdown: {
    fontSize: "clamp(24px, 5vw, 40px)",  // Responsive font size
    fontWeight: "600",
    display: "flex",
    justifyContent: "space-around",
    width: "100%", // Ensures countdown spans the width of the content
    animation: "pulse 1s infinite",
    flexWrap: "wrap",  // Wraps on smaller screens
  },
  timerUnit: {
    padding: "10px 20px",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    margin: "5px",  // Adds spacing between countdown units
    boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)",
    animation: "fadeInUp 1s ease-in-out",
    flex: "1 1 100px", // Allows flexbox items to shrink and grow
  },
  interval: {
    fontSize: "16px",
    display: "block",
    marginTop: "5px",
    textTransform: "capitalize",
  },
  "@keyframes fadeIn": {
    "0%": { opacity: 0 },
    "100%": { opacity: 1 },
  },
  "@keyframes pulse": {
    "0%": { transform: "scale(1)" },
    "50%": { transform: "scale(1.05)" },
    "100%": { transform: "scale(1)" },
  },
  "@keyframes fadeInUp": {
    "0%": { transform: "translateY(20px)", opacity: 0 },
    "100%": { transform: "translateY(0)", opacity: 1 },
  },
};

export default ComingSoonCountdown;
