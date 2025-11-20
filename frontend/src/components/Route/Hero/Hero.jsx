import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // Use direct image URLs or local imports
  const images = [
    "https://pikaso.cdnpk.net/private/production/2737126217/asset.jpg?token=exp=1763942400~hmac=d774fc02e76e7666b66305a51ece25ef36a40c531d0f40948f335e2449b675e0",
    "https://pikaso.cdnpk.net/private/production/2737129867/asset.jpg?token=exp=1763942400~hmac=d4b9ad5148ce3db5aeb198ae8e21b3594cb2dab54507b2313ca2b55f1614e446",
    "https://pikaso.cdnpk.net/private/production/2737133428/asset.jpg?token=exp=1763942400~hmac=eeace9937348bd18ef34da7303788afccc60c71b9678466a170f43057566ba6d"
  ];

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
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  const goToImage = (index) => setCurrentImage(index);

  return (
    <div 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900 z-[1]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Shapes */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full opacity-20 blur-xl animate-float-slow"></div>
        <div className="absolute top-3/4 right-1/3 w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full opacity-15 blur-lg animate-float-medium"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-gradient-to-r from-blue-400 to-emerald-300 rounded-full opacity-10 blur-md animate-float-fast"></div>
        
        {/* Grid Pattern with Parallax */}
        <div 
          className="absolute inset-0 opacity-10 transition-transform duration-100 ease-out"
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
          <div className="text-white space-y-8 animate-slide-in-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 animate-fade-in-up mt-12">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Welcome to Ariaria Marketplace</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="hero-gradient-text">
                {headlines[currentImage]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl animate-fade-in-up delay-200">
              {subtitles[currentImage]}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
              <Link to="/products">
                <button className="hero-primary-btn group">
                  <span className="relative z-10">Start Shopping Now</span>
                  <div className="hero-btn-overlay"></div>
                </button>
              </Link>
              
              <Link to="/dashboard">
                <button className="hero-secondary-btn group">
                  <span className="hero-gradient-text">Become a Seller</span>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10 animate-fade-in-up delay-600">
              {[
                { number: "Very", label: "Happy Customers" },
                { number: "Top", label: "Verified Sellers" },
                { number: "Great", label: "Products" }
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="text-2xl font-bold hero-gradient-text group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image Carousel - Right Side */}
          <div className="relative h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl group animate-slide-in-right">
            {/* Image Container */}
            <div className="relative w-full h-full overflow-hidden">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out ${
                    index === currentImage 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-105'
                  }`}
                  style={{ backgroundImage: `url(${image})` }}
                >
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                </div>
              ))}
            </div>
            
            {/* Image Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentImage === index 
                      ? 'bg-emerald-400 scale-125 shadow-lg shadow-emerald-400/50' 
                      : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                  }`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="hero-nav-btn left-4 group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="hero-nav-btn right-4 group"
            >
              <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Floating Card */}
            {/*<div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-emerald-500 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-md animate-float-card">
              <div className="text-sm font-semibold">🔥 Trending Now</div>
              <div className="text-xs opacity-90">50+ new products</div>
            </div>*/}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
       {/*<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60 animate-bounce-slow">
        <span className="text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>*/}

      {/* Custom CSS for animations */}
      <style jsx>{`
        .hero-gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #34d399 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-primary-btn {
          position: relative;
          background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1.125rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .hero-primary-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
        }

        .hero-btn-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1d4ed8 0%, #047857 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hero-primary-btn:hover .hero-btn-overlay {
          opacity: 1;
        }

        .hero-secondary-btn {
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 1.125rem;
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }

        .hero-secondary-btn:hover {
          border-color: rgba(52, 211, 153, 0.5);
          transform: scale(1.05);
          box-shadow: 0 10px 30px rgba(52, 211, 153, 0.2);
        }

        .hero-nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.3);
          color: white;
          padding: 0.75rem;
          border-radius: 50%;
          backdrop-filter: blur(12px);
          transition: all 0.3s ease;
        }

        .hero-nav-btn:hover {
          background: rgba(0, 0, 0, 0.5);
          transform: translateY(-50%) scale(1.1);
        }

        /* Animations */
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(30px, -30px) rotate(180deg); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-20px, 20px) rotate(-180deg); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -15px) scale(1.2); }
        }

        @keyframes float-card {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 6s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }

        .animate-float-card {
          animation: float-card 3s ease-in-out infinite;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default Hero;
