import React, { useEffect, useRef } from "react";
import ub from "./ub.jpg";
import abnm from "./abnm.jpg";

const Sponsored = () => {
  const sponsors = [
    { id: 1, img: abnm, alt: "Sponsor 1" },
    { id: 2, img: ub, alt: "Sponsor 2" },
  ];

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

        if (scrollLeft + clientWidth >= scrollWidth) {
          scrollContainerRef.current.scrollLeft = 0; // Reset to the start
        } else {
          scrollContainerRef.current.scrollLeft += 1; // Adjust scroll speed
        }
      }
    };

    const interval = setInterval(scroll, 70); // Smooth scrolling interval
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div
      style={{
        padding: "40px 20px",
        background: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        marginBottom: "48px",
      }}
    >
      {/* Header */}
      <h2
        style={{fontSize: "28px",
          fontWeight: "bold",
          background: "linear-gradient(90deg, #00b894, #0984e3)", // Updated gradient to green and blue
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          animation: "gradientMove 3s infinite alternate",
          
        }}
      >
        Meet Our Sponsors
      </h2>
      <p style={{ fontSize: "16px", color: "#555", marginBottom: "24px" }}>
        We are proud to be supported by these amazing organizations.
      </p>

      {/* Sponsor Carousel */}
      <div
        ref={scrollContainerRef}
        style={{
          display: "flex",
          overflow: "hidden",
          scrollBehavior: "smooth",
          gap: "20px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            style={{
              flex: "1 1 auto",
              textAlign: "center",
            }}
          >
            <img
              src={sponsor.img}
              alt={sponsor.alt}
              style={{
                maxWidth: "100%",
                maxHeight: "100px",
                objectFit: "contain",
                margin: "0 auto",
              }}
            />
          </div>
        ))}
      </div>

{/* Keyframe animation for heading */}
<style>
        {`
          @keyframes gradientMove {
            0% {
              background-position: 0%;
            }
            100% {
              background-position: 100%;
            }
          }
        `}
      </style>

    </div>
  );
};

export default Sponsored;
