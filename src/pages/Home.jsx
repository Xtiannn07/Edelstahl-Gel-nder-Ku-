import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fetchGalleryImages } from '../redux/slices/gallerySlice';
import { selectTranslations } from '../redux/slices/languageSlice';
import Header from '../components/Header';
import Services from '../components/Services';
import Gallery from '../components/Gallery';
import Testimonials from '../components/Testimonials';
import AnimatedSection from '../components/AnimatedSection';

// Use client directive for client-side rendering
export default function Home() {
  const translations = useSelector(selectTranslations);
  const dispatch = useDispatch();
  
  // Fetch gallery images when component mounts
  useEffect(() => {
    dispatch(fetchGalleryImages());
  }, [dispatch]);
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Services Section */}
        <AnimatedSection>
          <Services />
        </AnimatedSection>
        
        {/* Gallery Preview Section */}
        <Gallery />
        
        {/* Testimonials Section */}
        <Testimonials />
        
        {/* Call to Action */}
        <AnimatedSection>
          <section className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">{translations.contact.title}</h2>
              <p className="font-title mb-8 max-w-2xl mx-auto">
                Let us help bring your vision to life with our high-quality stainless steel products.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                >
                  {translations.contact.title}
                  <ArrowRight size={18} className="ml-2" />
                </Link>
              </motion.div>
            </div>
          </section>
        </AnimatedSection>
      </motion.div>
    </div>
  );
}