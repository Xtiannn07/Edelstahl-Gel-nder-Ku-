import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Redux slices
import { fetchGalleryImages } from './redux/slices/gallerySlice';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  
  // Prefetch gallery images when app loads
  useEffect(() => {
    dispatch(fetchGalleryImages());
  }, [dispatch]);
  
  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen bg-white text-gray-900">
        {/* Keep Navbar with high z-index to ensure it stays visible */}
        <Navbar className="relative z-50" />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        
        <Footer className="relative z-99"/>
      </div>
    </LanguageProvider>
  );
}

export default App;