import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

// Import your local images
import bannerImage1 from "./bannerImage1.jpg";
import bannerImage2 from "./bannerImage2.jpg";
import bannerImage3 from "./bannerImage3.jpg";

const Hero = () => {
  // Carousel State to track which image to display
  const [currentImage, setCurrentImage] = useState(0);

  // Array of Images
  const images = [bannerImage1, bannerImage2, bannerImage3];

  // Change the image every 5 seconds (5000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [images.length]);

  return (
    <div className={`relative w-full ${styles.normalFlex}`}>
      <div
        className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.normalFlex}`}
        style={{
          backgroundImage: `url(${images[currentImage]})`, // Dynamically set image
          backgroundSize: "cover",
          transition: "background-image 1s ease-in-out", // Smooth transition
        }}
      >
        <Link to="/">
          <img
            src={images[currentImage]} // Dynamically set image
            alt="Banner"
            style={{
              position: "absolute",
              zIndex: "-1",
              height: "100%",
              objectFit: "cover",
              width: "100%",
            }}
          />
        </Link>

        <div
          className={`${styles.section} w-[90%] 800px:w-[60%]`}
          style={{ position: "absolute", marginTop: "180px", marginLeft: "10%", marginRight: "10%" }}
        >
          <h1
            className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[blue] font-[700] capitalize`}
          >
            <p className="pt-5 text-[25px] font-[700] text-[green]">Welcome to</p>
            ARIARIA
            <p className="text-[35px] text-[blue] font-[700]">MARKETPLACE</p>
          </h1>
          <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
            Shop Smart, Live Better. Experience the Future of Online Shopping
          </p>
          <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
              <span className="text-[#fff] font-[Poppins] text-[18px]">Shop Now!</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
