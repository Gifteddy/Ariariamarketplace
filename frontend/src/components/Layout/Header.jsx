import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import logo from './logo.png';

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      {/* Top Bar - Desktop */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-2 hidden 800px:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <span>🔥 Hot Deals</span>
            <span>🚚 Free Shipping</span>
            <span>⭐ 24/7 Support</span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/profile" className="hover:text-blue-200 transition-colors">
                Welcome, {user?.name}
              </Link>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="hover:text-blue-200 transition-colors">
                  Login
                </Link>
                <Link to="/sign-up" className="hover:text-blue-200 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header - Desktop */}
      <div className={`${styles.section} bg-white border-b border-gray-200 z-[1000]`}>
        <div className="hidden 800px:flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src={logo} 
                alt="Ariaria Marketplace" 
                className="h-12 object-contain"
              />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full h-12 px-4 pr-12 border-2 border-blue-500 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
              />
              <AiOutlineSearch
                size={24}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors"
              />
              
              {/* Search Results Dropdown */}
              {searchData && searchData.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-80 overflow-y-auto z-[1000]">
                  {searchData.map((product, index) => (
                    <Link 
                      key={index}
                      to={`/product/${product._id}`}
                      className="flex items-center p-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                      onClick={() => setSearchData(null)}
                    >
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">₦{product.discountPrice || product.originalPrice}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-6">
            {/* Become Seller Button */}
            <Link 
              to={isSeller ? "/dashboard" : "/shop-create"}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              {isSeller ? "Dashboard" : "Become Seller"}
            </Link>

            {/* Wishlist */}
            <div className="relative group">
              <button
                onClick={() => setOpenWishlist(true)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative"
              >
                <AiOutlineHeart size={28} />
                {wishlist && wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>

            {/* Cart */}
            <div className="relative group">
              <button
                onClick={() => setOpenCart(true)}
                className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative"
              >
                <AiOutlineShoppingCart size={28} />
                {cart && cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>

            {/* Profile */}
            <div className="relative group">
              {isAuthenticated ? (
                <Link to="/profile" className="flex items-center space-x-2 p-2">
                  <img
                    src={user?.avatar?.url}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-500"
                  />
                </Link>
              ) : (
                <Link to="/login" className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
                  <CgProfile size={28} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar - Desktop */}
      <div className={`hidden 800px:block bg-white border-b border-gray-200 z-[999] ${
        active ? "fixed top-0 left-0 right-0 shadow-lg" : ""
      } transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropDown(!dropDown)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <BiMenuAltLeft size={20} />
                <span>All Categories</span>
                <IoIosArrowDown 
                  size={16} 
                  className={`transition-transform ${dropDown ? 'rotate-180' : ''}`}
                />
              </button>
              
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>

            {/* Navigation Links */}
            <Navbar active={activeHeading} />

            {/* Additional Info */}
            <div className="text-sm text-gray-600">
              <span>🛡️ 100% Secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className={`800px:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-[1000] ${
        active ? 'shadow-lg' : ''
      } transition-shadow duration-300`}>
        <div className="flex items-center justify-between p-4">
          {/* Menu Button */}
          <button
            onClick={() => setOpen(true)}
            className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
          >
            <BiMenuAltLeft size={28} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img 
              src={logo} 
              alt="Ariaria Marketplace" 
              className="h-10 object-contain"
            />
          </Link>

          {/* Cart Icon */}
          <button
            onClick={() => setOpenCart(true)}
            className="p-2 text-gray-700 hover:text-blue-600 transition-colors relative"
          >
            <AiOutlineShoppingCart size={28} />
            {cart && cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-12 px-4 pr-12 border-2 border-blue-500 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
            />
            <AiOutlineSearch
              size={24}
              className="absolute right-3 top-3 text-gray-500"
            />
            
            {/* Mobile Search Results */}
            {searchData && searchData.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-xl mt-1 max-h-60 overflow-y-auto z-[1000]">
                {searchData.map((product, index) => (
                  <Link 
                    key={index}
                    to={`/product/${product._id}`}
                    className="flex items-center p-3 hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => setSearchData(null)}
                  >
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-8 h-8 object-cover rounded mr-3"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h4>
                      <p className="text-xs text-gray-600">₦{product.discountPrice || product.originalPrice}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[2000] 800px:hidden">
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-xl transform transition-transform duration-300">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                {isAuthenticated ? (
                  <img
                    src={user?.avatar?.url}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                  />
                ) : (
                  <CgProfile size={32} className="text-gray-600" />
                )}
                <div>
                  <h3 className="font-medium text-gray-900">
                    {isAuthenticated ? user?.name : 'Welcome'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isAuthenticated ? user?.email : 'Guest User'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <RxCross1 size={24} />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="p-4 space-y-6">
              {/* Wishlist */}
              <button
                onClick={() => { setOpenWishlist(true); setOpen(false); }}
                className="flex items-center justify-between w-full p-3 text-left hover:bg-blue-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <AiOutlineHeart size={24} className="text-red-500" />
                  <span className="font-medium">Wishlist</span>
                </div>
                {wishlist && wishlist.length > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Navigation */}
              <Navbar active={activeHeading} />

              {/* Become Seller */}
              <Link 
                to={isSeller ? "/dashboard" : "/shop-create"}
                className="block w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-center py-3 rounded-lg font-medium transition-all duration-300"
                onClick={() => setOpen(false)}
              >
                {isSeller ? "Seller Dashboard" : "Become a Seller"}
              </Link>

              {/* Auth Links */}
              {!isAuthenticated && (
                <div className="flex space-x-4 pt-4">
                  <Link
                    to="/login"
                    className="flex-1 text-center py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/sign-up"
                    className="flex-1 text-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Popup */}
      {openCart && <Cart setOpenCart={setOpenCart} />}

      {/* Wishlist Popup */}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}

      {/* Spacer for fixed mobile header */}
      <div className="800px:hidden h-28"></div>
    </>
  );
};

export default Header;
