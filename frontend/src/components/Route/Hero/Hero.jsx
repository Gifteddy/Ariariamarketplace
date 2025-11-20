import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Import your local images
import bannerImage1 from "./bannerImage1.jpg";
import bannerImage2 from "./bannerImage2.jpg";
import bannerImage3 from "./bannerImage3.jpg";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  const images = [bannerImage1, bannerImage2, bannerImage3];
  const headlines = [
    "Elevate Your Shopping Experience",
    "Discover Unique Treasures",
    "Style Meets Innovation"
  ];
  const subtitles = [
    "Where quality meets convenience in every purchase",
    "Find exactly what you've been searching for",
    "Transform your lifestyle with curated collections"
  ];

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const { left, top, width, height } = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate images
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  const goToImage = (index) => setCurrentImage(index);

  // Floating animation variants
  const floatingAnimation = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const slideInLeft = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const slideInRight = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const fadeInUp = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full opacity-20 blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full opacity-15 blur-lg"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Text Content - Left Side */}
          <motion.div 
            className="text-white space-y-8"
            initial="initial"
            animate="animate"
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20"
              variants={fadeInUp}
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Welcome to Ariaria Marketplace</span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-5xl lg:text-7xl font-bold leading-tight"
              variants={slideInLeft}
            >
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                {headlines[currentImage]}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl text-gray-300 leading-relaxed max-w-2xl"
              variants={fadeInUp}
            >
              {subtitles[currentImage]}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
            >
              <Link to="/products">
                <motion.button 
                  className="group relative bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Start Shopping Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <motion.div 
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.button>
              </Link>
              
              <Link to="/become-seller">
                <motion.button 
                  className="group border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg backdrop-blur-md"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(74, 222, 128, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Become a Seller
                  </span>
                </motion.button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10"
              variants={fadeInUp}
            >
              {[
                { number: "10K+", label: "Happy Customers" },
                { number: "500+", label: "Verified Sellers" },
                { number: "5K+", label: "Products" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <motion.div 
                    className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Carousel - Right Side */}
          <motion.div 
            className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            variants={slideInRight}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${images[currentImage]})` }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Image Navigation */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentImage === index 
                          ? 'bg-emerald-400 scale-125' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-md transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Floating Card */}
            <motion.div 
              className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-emerald-500 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-md"
              variants={floatingAnimation}
              animate="animate"
            >
              <div className="text-sm font-semibold">🔥 Trending Now</div>
              <div className="text-xs opacity-90">50+ new products</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
