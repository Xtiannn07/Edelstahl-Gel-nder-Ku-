import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { fetchGalleryImages } from '../redux/slices/gallerySlice';
import { selectTranslations } from '../redux/slices/languageSlice';
import AnimatedHeader from '../components/AnimatedHeader';
import Gallery from '../components/Gallery';
import AnimatedSection from '../components/AnimatedSection';

export default function Home() {
  const translations = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const contentRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Handle scroll to control blur intensity
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Calculate blur amount based on scroll position
  const blurAmount = Math.min(5, scrollY / 100); // Max blur of 10px
  
  // Fetch gallery images when component mounts
  useEffect(() => {
    dispatch(fetchGalleryImages());
  }, [dispatch]);
  
  return (
    <div className="min-h-screen relative">
      {/* Fixed background with animated header */}
      <div 
        className="fixed inset-0 w-full h-screen z-0"
        style={{
          filter: `blur(${blurAmount}px)`,
          transition: 'filter 0.2s ease-out'
        }}
      >
        <AnimatedHeader 
          fixed={false} // Not needed since parent is already fixed
          blurOnScroll={false} // We handle blur manually
          showScrollIndicator={false} // Not needed since we have
          maskEdges={false}
          className="h-full w-full"
        />
      </div>
      
      {/* Hero content positioned over the background */}
      <div className="relative z-10 min-h-screen flex items-center justify-center" >
      <AnimatedSection>
        <motion.div
          className="flex flex-col items-center justify-center text-center px-4 mt[-20]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-stone-100 mb-4">
            {translations.header}
          </h1>
          <p className="font-title text-xl md:text-2xl lg:text-3xl font-bold text-stone-100 mb-8">
            {translations.subheader}
          </p>
          
          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            <Link
              to="/services"
              className="inline-flex items-center bg-stone-100 text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
            >
              Explore Our Services
              <ArrowRight size={18} className="ml-2" />
            </Link>
          </motion.div>


          {/* Scroll Down Indicator */}
            <div className="absolute top-[80%] left-1/2 transform -translate-x-1/2 flex flex-row items-center">
              {/* Replace below with your indicator icon/component */}
              <div className="flex flex-row items-center animate-bounce text-stone-100">
                <ArrowDown size={24} className=" mr-2" />
                  <span className="font-medium justify-center text-sm">Scroll Down</span>
              </div>
            </div>

        </motion.div>
        
        </AnimatedSection>
      </div>
      
      {/* Content area - now directly after hero without gap */}
      <div 
        ref={contentRef}
        className="relative z-10"
      >
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          
          {/* Gallery Preview Section */}
          <AnimatedSection>
            <div className="py-12">
              <Gallery />
            </div>
          </AnimatedSection>

          
          
          {/* Call to Action */}
          <AnimatedSection>
            <section className="py-4 pb-16 max-w-6xl mx-auto ">
              <div className="container mx-auto px-4 text-center text-stone-100">
                <h2 className="text-3xl font-bold mb-6">{translations.contact.title}</h2>
                <p className=" mb-8 max-w-2xl mx-auto">
                  Let us help bring your vision to life with our hi gh-quality stainless steel products.
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
    </div>
  );
}

 