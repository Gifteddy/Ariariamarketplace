import React, { useEffect, useRef } from "react";
import styles from "../../styles/styles";
import ub from "./ub.jpg";
import abnm from "./abnm.jpg";

const Sponsored = () => {
  const sponsors = [
    { id: 1, img: ub, alt: "Sponsor 1" },
    { id: 2, img: abnm, alt: "Sponsor 2" },
    { id: 3, img: ub, alt: "Sponsor 3" },
    { id: 4, img: abnm, alt: "Sponsor 4" },
  ];

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

        if (scrollLeft + clientWidth >= scrollWidth) {
          // If at the end, restart scroll
          scrollContainerRef.current.scrollLeft = 0;
        } else {
          // Continue scrolling
          scrollContainerRef.current.scrollLeft += 1; // Adjust scroll step for speed
        }
      }
    };

    const interval = setInterval(scroll, 50); // Adjust interval for speed
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className={`${styles.section} bg-white py-10 px-5 mb-12 rounded-xl`}>
      <div
        ref={scrollContainerRef}
        className="flex overflow-hidden whitespace-nowrap"
        style={{
          scrollBehavior: "smooth",
        }}
      >
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="inline-block mx-5 flex-shrink-0"
          >
            <img
              src={sponsor.img}
              alt={sponsor.alt}
              className="w-40 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsored;
