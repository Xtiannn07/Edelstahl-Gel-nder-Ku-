import { useSelector } from 'react-redux';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Award, 
  Shield, 
  Clock, Check, ArrowRight 
} from 'lucide-react';
import { selectTranslations } from '../redux/slices/languageSlice';
import Services from '../components/Services';
import AnimatedSection from '../components/AnimatedSection';

// Use client directive for client-side rendering
export default function ServicesPage() {
  const translations = useSelector(selectTranslations);
  const [isHovered, setIsHovered] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  
  // Get services data directly from translations
  const { title, items } = translations.services;
  
  // Benefits section data from translations
  const benefits = [
    {
      icon: <CheckCircle2 size={24} className="text-green-600" />,
      title: translations.services.benefit1,
      description: translations.services.description1
    },
    {
      icon: <Award size={24} className="text-yellow-600" />,
      title: translations.services.benefit2,
      description: translations.services.description2
    },
    {
      icon: <Shield size={24} className="text-blue-600" />,
      title: translations.services.benefit3,
      description: translations.services.description3
    },
    {
      icon: <Clock size={24} className="text-purple-600" />,
      title: translations.services.benefit4,
      description: translations.services.description4
    }
  ];
  
  return (
    <div className="min-h-screen ">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <AnimatedSection animationType="fadeIn">
          <div className="bg-stone-100 max-w-full">
            <div className="container mx-auto px-4 py-4 md:py-16 ">
              <div className="max-w-4xl mx-auto pt-2">
                <p className="text-sm md:text-lg text-gray-700 text-center">
                  {translations.services.description}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
        
          {/* Services Section */}
          <AnimatedSection>
            <div className="py-8">
              <Services />
            </div>
          </AnimatedSection>

        
        {/* Benefits Section */}
        <section className="py-4">
          <div className="container max-w-7xl mx-auto px-4">
            <AnimatedSection animationType="fadeUp">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Services</h2>
            </AnimatedSection>
              
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 p-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="transform-gpu transition-all duration-300 ease-in-out" 
                    style={{ 
                      transform: activeIndex === index ? 'scale(1.05)' : 'scale(1)', 
                      zIndex: activeIndex === index ? 10 : 1 
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                > 
                  <AnimatedSection animationType="slideRight">
                    <div className={`p-6 rounded-lg shadow-md flex flex-col h-64 transition-all duration-300 ease-in-out
                          ${activeIndex === index ? 'bg-blue-50' : 'bg-gradient-to-r from-gray-100 to-gray-200 hover:bg-gray-100'}`}
                    >
                      <div className="flex justify-center mb-4 transition-transform duration-300 ease-in-out">
                        <div className={activeIndex === index ? 'transform scale-110' : ''}>
                          {benefit.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                      <p className="text-gray-600 flex-grow">{benefit.description}</p>
                    </div>
                  </AnimatedSection>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <AnimatedSection>
          <section className="p-8">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl p-10 shadow-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-left max-w-xl">
                    <h2 className="text-3xl md:text-4xl font-light mb-4 text-gray-800">
                      {translations.contact.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      {translations.contact.description}
                    </p>
                  </div>
                  
                  <div className="w-full md:w-auto">
                    <a 
                      href="/contact"
                      className={`group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg transition-all duration-300 w-full md:w-auto ${isHovered ? 'shadow-lg' : 'shadow-md'}`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <span className="font-medium">{translations.contact.title}</span>
                      <ArrowRight 
                        size={18} 
                        className={`transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </motion.div>
    </div>
  );
}