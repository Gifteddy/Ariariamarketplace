import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

// Import your local images
import bannerImage1 from "./bannerImage1.jpg";
import bannerImage2 from "./bannerImage2.jpg";
import bannerImage3 from "./bannerImage3.jpg";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  // Array of Images
  const images = [bannerImage1, bannerImage2, bannerImage3];

  // Change the image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 5000); // 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  // Function to go to the previous image
  const handlePrevImage = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  // Function to go to the next image
  const handleNextImage = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fixed Text Content */}
      <div
  className={`${
    styles.section
  } w-[90%] 800px:w-[60%] absolute  p-5 ${
    // For larger screens (>= 800px), center vertically, for smaller screens move to bottom center
    window.innerWidth < 1200
      ? "bottom-10 left-1/2 transform -translate-x-1/2 translate-y-0 text-center bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-md px-4 py-3 max-w-[1000px] text-[0.5rem]"
      : "top-1/2 left-[10%] transform -translate-y-1/2"
  }`}  style={{
    zIndex: 1,
  }}
>
  <h1 className="text-[35px] leading-[1.2] 800px:text-[60px] text-[blue] font-[700] capitalize">
    <p className="pt-5 text-[25px] font-[700] text-[green]">Welcome to</p>
    ARIARIA
    <p className="text-[35px] text-[blue] font-[700]">MARKETPLACE</p>
  </h1>
  <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
    Shop Smartly, Elevate Your Lifestyle.<br /> Welcome to the Future of Online Shopping!
  </p>
  <Link to="/products" className="inline-block">
    <div className={`${styles.button} mt-5`}>
      <span className="text-[#fff] font-[Poppins] text-[18px]">Shop Now!</span>
    </div>
  </Link>
</div>

      {/* Carousel */}
      <div
        className="relative min-h-[70vh] 800px:min-h-[80vh] w-full flex transition-transform ease-in-out duration-1000"
        style={{
          transform: `translateX(-${currentImage * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0"
            style={{
              zIndex: -200,
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "right", // Right edge aligned with screen
            }}
          >
            {/* This img tag is optional since the div uses backgroundImage */}
            <img
              src={image}
              alt="Banner"
              className="w-full h-full object-cover"
              style={{ visibility: "hidden" }} // Image is hidden since backgroundImage is used
            />
          </div>
        ))}
      </div>

      {/* Bottom Navigation (Arrows and Dots) */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center space-x-4 ">
        {/* Left arrow for carousel navigation */}
        <button
          onClick={handlePrevImage}
          className="text-white p-3 hover:scale-110 "
          style={{ background: "none", border: "none" }}
        >
          &#9664;
        </button>

        {/* Dots for banner indication */}
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentImage === index ? "bg-white" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>

        {/* Right arrow for carousel navigation */}
        <button
          onClick={handleNextImage}
          className="text-white p-3 hover:scale-110 z-20"
          style={{ background: "none", border: "none" }}
        >
          &#9654;
        </button>
      </div>
    </div>
  );
};

export default Hero;