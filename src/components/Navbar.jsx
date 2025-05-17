import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { selectTranslations } from '../redux/slices/languageSlice';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const translations = useSelector(selectTranslations);
  const { navigation } = translations;
  
  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Close mobile menu when a link is clicked
  const closeMenu = () => setIsOpen(false);
  
// Handle scroll event with debounce for stability
useEffect(() => {
  // Define scroll threshold
  const scrollThreshold = window.innerHeight * 0.10;
  
  // Create a debounced version of the scroll handler
  let timeoutId = null;
  
  const handleScroll = () => {
    // Cancel any pending timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Use timeout to debounce the state update
    timeoutId = setTimeout(() => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > scrollThreshold);
      timeoutId = null;
    }, 50); // 50ms debounce time - adjust if needed
  };
  
  // Add event listener with passive option for performance
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Initial check - use setTimeout to ensure it happens after component mounts fully
  setTimeout(() => {
    setIsScrolled(window.scrollY > scrollThreshold);
  }, 10);
  
  // Clean up
  return () => {
    window.removeEventListener('scroll', handleScroll);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
}, []);
  
  // Active link styles
  const activeStyle = "text-blue-600 font-semibold";
  const inactiveStyle = "text-gray-700 hover:text-blue-600 transition-colors";
  
  return (
    <motion.nav 
      className="bg-stone-300 shadow-md sticky top-0 z-40"
      animate={{
        paddingTop: isScrolled ? '0.25rem' : '0.5rem',
        paddingBottom: isScrolled ? '0.25rem' : '0.5rem'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-2 pr-10 md:px-12">
        <div className="flex justify-between items-center">
        {/* Logo/Brand */}
        <NavLink to="/" className="flex items-center overflow-hidden">
        <div className="container mx-auto px-4 py-2">
          <a href="/" className="flex items-center">
            <motion.div
              className="flex items-center justify-center"
              animate={{ 
                height: isScrolled ? '3.5rem' : '5rem',
                width: isScrolled ? '3.5rem' : '5rem'
              }}
              transition={{ duration: 0.3 }}
            >
              {/* SVG recreation of the logo in the image */}
              <img 
              src="/icon.svg" 
              alt="Kessler Logo" 
              className="h-full w-full object-contain"
            />
            </motion.div>
            
            <div className="flex flex-col">
              <motion.div 
                animate={{ 
                  fontSize: isScrolled ? '0.5rem' : '1rem'
                }}
                transition={{ duration: 0.3 }}
                className="font-bold text-gray-700 leading-tight"
              >
                EDELSTAHL-
              </motion.div>
              <motion.div 
                animate={{ 
                  fontSize: isScrolled ? '0.5rem' : '1rem'
                }}
                transition={{ duration: 0.3 }}
                className="font-bold text-gray-700 leading-tight"
              >
                GELÄNDER
              </motion.div>
              <motion.div 
                animate={{ 
                  fontSize: isScrolled ? '0.75rem' : '1.5rem'
                }}
                transition={{ duration: 0.3 }}
                className="font-bold text-gray-700 leading-tight"
              >
                KUŚ
              </motion.div>
            </div>
          </a>
        </div>
        </NavLink>

          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div 
              className="flex items-center space-x-8"
              animate={{ 
                fontSize: isScrolled ? '1rem' : '1.125rem'
              }}
              transition={{ duration: 0.3 }}
            >
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
            </motion.div>
            
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
              <div className="py-4 flex flex-col px-4 text-xs">
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
    </motion.nav>
  );
}