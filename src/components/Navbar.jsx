import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { selectTranslations } from '../redux/slices/languageSlice';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const translations = useSelector(selectTranslations);
  const { navigation } = translations;
  
  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Close mobile menu when a link is clicked
  const closeMenu = () => setIsOpen(false);
  
  // Active link styles
  const activeStyle = "text-blue-600 font-semibold";
  const inactiveStyle = "text-gray-700 hover:text-blue-600 transition-colors";
  
  return (
    <nav className="bg-white shadow-md py-3 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <NavLink to="/" className="text-xl font-bold text-gray-800">
            Kessler <span className="text-blue-600">Construction</span>
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
              end
            >
              {navigation.home}
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            >
              {navigation.about}
            </NavLink>
            <NavLink 
              to="/services" 
              className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            >
              {navigation.services}
            </NavLink>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            >
              {navigation.gallery}
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => isActive ? activeStyle : inactiveStyle}
            >
              {navigation.contact}
            </NavLink>
            
            {/* Language Switcher in Navbar */}
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 flex flex-col space-y-4">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`}
                  onClick={closeMenu}
                  end
                >
                  {navigation.home}
                </NavLink>
                <NavLink 
                  to="/about" 
                  className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`}
                  onClick={closeMenu}
                >
                  {navigation.about}
                </NavLink>
                <NavLink 
                  to="/services" 
                  className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`}
                  onClick={closeMenu}
                >
                  {navigation.services}
                </NavLink>
                <NavLink 
                  to="/gallery" 
                  className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`}
                  onClick={closeMenu}
                >
                  {navigation.gallery}
                </NavLink>
                <NavLink 
                  to="/contact" 
                  className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`}
                  onClick={closeMenu}
                >
                  {navigation.contact}
                </NavLink>
                
                {/* Mobile Language Switcher */}
                <div className="py-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}