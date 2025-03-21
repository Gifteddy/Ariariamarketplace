import React, { useState } from "react";
import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import { footercompanyLinks, footerProductLinks } from "../../static/data";
import logo from "./logo.png";

const Footer = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000); // Hide after 2 seconds
  };

  return (
    <div className="bg-[#000] text-white relative">
      {showPopup && (
        <div className="absolute top-5 right-5 bg-green-500 text-white font-bold px-4 py-2 rounded shadow-xl">
          Submitted Successfully!
        </div>
      )}

      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#342ac8] py-7">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-[#2ddf5f]">Subscribe </span>for the Latest News!{" "}
          <br />
          events and offers
        </h1>
        <div>
          <input
            type="text"
            required
            placeholder="Enter your email..."
            className="text-gray-800 sm:w-72 w-full sm:mr-5 mr-1 lg:mb-0 mb-4 py-2.5 rounded px-2 focus:outline-none"
          />
          <button
            onClick={handleSubmit}
            className="bg-[#56d879] hover:bg-teal-500 duration-300 px-5 py-2.5 rounded-md text-white md:w-auto w-full"
          >
            Submit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 sm:text-center">
        <ul className="px-5 text-center sm:text-start flex sm:block flex-col items-center">
          <img
            src={logo}
            alt="Logo"
            style={{ filter: "brightness(0) invert(1)", maxHeight: "100px" }}
          />
          <br />
          <p>Bringing unique value to many exceptional products.</p>
          <div className="flex items-center mt-[15px]">
            <a href="https://www.instagram.com/ariariamarketplace" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram size={25} style={{ marginLeft: "15px", cursor: "pointer" }} />
            </a>
            <a href="https://www.facebook.com/ariariamarketplace.com.ng?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <AiFillFacebook size={25} style={{ marginLeft: "15px", cursor: "pointer" }} />
            </a>
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Explore</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Link className="text-gray-400 hover:text-teal-400 duration-300 text-sm cursor-pointer leading-6" to={link.link}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center pt-2 text-gray-400 text-sm pb-8">
        <span>© 2024 Abanaijamade. All rights reserved.</span>
        <span><a href="/terms">Terms</a> · <a href="/policy">Privacy Policy</a></span>
        <div className="sm:block flex items-center justify-center w-full">
          <img src="https://th.bing.com/th/id/OIP.U5zrNL2JKAAYJSrYITOvaAAAAA?w=268&h=90&c=7&r=0&o=5&pid=1.7" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
