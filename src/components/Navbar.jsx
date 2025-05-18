// Navbar.jsx
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { selectTranslations } from '../redux/slices/languageSlice';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const translations = useSelector(selectTranslations);
  const { navigation } = translations;
  const { isAdmin } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const scrollThreshold = window.innerHeight * 0.10;
    let timeoutId = null;

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > scrollThreshold);
        timeoutId = null;
      }, 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(() => setIsScrolled(window.scrollY > scrollThreshold), 10);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const activeStyle = "text-blue-600 font-semibold";
  const inactiveStyle = "text-gray-700 hover:text-blue-600 transition-colors";

  return (
    <motion.nav 
      className="bg-stone-300 shadow-md sticky top-0 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
        paddingTop: isScrolled ? '0.25rem' : '0.5rem',
        paddingBottom: isScrolled ? '0.25rem' : '0.5rem'
      }}
      transition={{ duration: 1 }}
    >
      <div className="container mx-auto px-2 pr-10 md:px-12">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center overflow-hidden">
            <div className="container mx-auto px-4 py-2">
              <a href="/" className="flex items-center">
                <motion.div
                  className="flex items-center justify-center"
                  initial={false}
                  animate={{ 
                    height: isScrolled ? '3.5rem' : '5rem',
                    width: isScrolled ? '3.5rem' : '5rem'
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <img src="/icon.svg" alt="Kessler Logo" className="h-full w-full object-contain" />
                </motion.div>
                <div className="flex flex-col">
                  <motion.div className="font-bold text-gray-700 leading-tight" initial={false} animate={{ fontSize: isScrolled ? '0.5rem' : '1rem' }} transition={{ duration: 0.3 }}>EDELSTAHL-</motion.div>
                  <motion.div className="font-bold text-gray-700 leading-tight" initial={false} animate={{ fontSize: isScrolled ? '0.5rem' : '1rem' }} transition={{ duration: 0.3 }}>GELÄNDER</motion.div>
                  <motion.div className="font-bold text-gray-700 leading-tight" initial={false} animate={{ fontSize: isScrolled ? '0.75rem' : '1.5rem' }} transition={{ duration: 0.3 }}>KUŚ</motion.div>
                </div>
              </a>
            </div>
          </NavLink>

          <div className="hidden md:flex items-center space-x-8">
            <motion.div className="flex items-center space-x-8" initial={false} animate={{ fontSize: isScrolled ? '1rem' : '1.125rem' }} transition={{ duration: 0.3 }}>
              <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : inactiveStyle} end>{navigation.home}</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>{navigation.about}</NavLink>
              <NavLink to="/services" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>{navigation.services}</NavLink>
              <NavLink to="/gallery" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>{navigation.gallery}</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>{navigation.contact}</NavLink>
              {isAdmin && <NavLink to="/admin" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Admin</NavLink>}
            </motion.div>
            <div className="ml-4"><LanguageSwitcher /></div>
          </div>

          <button className="md:hidden text-gray-700 focus:outline-none" onClick={toggleMenu} aria-label={isOpen ? "Close menu" : "Open menu"}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden">
              <div className="py-4 flex flex-col px-4 text-xs">
                <NavLink to="/" className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`} onClick={closeMenu} end>{navigation.home}</NavLink>
                <NavLink to="/about" className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`} onClick={closeMenu}>{navigation.about}</NavLink>
                <NavLink to="/services" className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`} onClick={closeMenu}>{navigation.services}</NavLink>
                <NavLink to="/gallery" className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`} onClick={closeMenu}>{navigation.gallery}</NavLink>
                <NavLink to="/contact" className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`} onClick={closeMenu}>{navigation.contact}</NavLink>
                {isAdmin && <NavLink to="/admin" className={({ isActive }) => `block py-2 ${isActive ? activeStyle : inactiveStyle}`} onClick={closeMenu}>Admin</NavLink>}
                <div className="py-2"><LanguageSwitcher /></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
