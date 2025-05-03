import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { selectTranslations } from '../redux/slices/languageSlice';
import AnimatedSection from './AnimatedSection';

// Sample testimonials data
const testimonialData = [
  {
    id: 1,
    text: "The team at Kessler delivered exceptional quality with our balcony railings. The craftsmanship and attention to detail exceeded our expectations.",
    author: "Anna M.",
    location: "Grebenau"
  },
  {
    id: 2,
    text: "From design to installation, the process was smooth and professional. Our stair railings are not only functional but also a beautiful addition to our home.",
    author: "Stefan L.",
    location: "Frankfurt"
  },
  {
    id: 3,
    text: "The custom gate they created for our garden entrance is stunning. The quality of the stainless steel and the workmanship is outstanding.",
    author: "Maria K.",
    location: "Darmstadt"
  }
];

export default function Testimonials() {
  const translations = useSelector(selectTranslations);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  
  // Handle navigation
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialData.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialData.length) % testimonialData.length);
  };
  
  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);
  
  // Autoplay functionality
  useEffect(() => {
    if (!autoplay) return;
    
    const timer = setTimeout(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [activeIndex, autoplay]);
  
  return (
    <AnimatedSection>
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {translations.testimonials.title}
          </h2>
          
          <div 
            className="max-w-4xl mx-auto relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Testimonial Carousel */}
            <div className="relative bg-white rounded-lg shadow-md p-8 min-h-[200px]">
              <Quote size={32} className="text-blue-200 absolute top-6 left-6 -z-10" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <p className="italic text-gray-600 mb-6 relative z-10">
                    "{testimonialData[activeIndex].text}"
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium">
                      — {testimonialData[activeIndex].author}, {testimonialData[activeIndex].location}
                    </p>
                    <div className="flex gap-1">
                      {testimonialData.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            index === activeIndex 
                              ? 'bg-blue-600' 
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
                <motion.button
                  onClick={prevTestimonial}
                  className="bg-white rounded-full p-2 shadow-md pointer-events-auto"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  onClick={nextTestimonial}
                  className="bg-white rounded-full p-2 shadow-md pointer-events-auto"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}