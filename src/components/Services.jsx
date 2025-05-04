import { useSelector } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

export default function Services() {
  const translations = useSelector(selectTranslations);
  const { services } = translations;
  
  return (
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Services List */}
        <AnimatedSection>
          <section className="max-w-4xl mx-auto py-8 mb-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-6">{services.title}</h2>
              <p className="text-center mb-8 max-w-2xl mx-auto">{services.description}</p>
                  
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 max-w-4xl mx-auto">
                {services.items.map((item, index) => (
                <AnimatedSection key={index} animationType="slideRight">
                  <motion.div
                    className="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-blue-600 mr-3 mt-1">
                      <Check size={24} className="text-blue-600" />
                    </span>
                    <div>
                      <h3 className="font-medium mb-1">{item}</h3>
                    </div>
                  </motion.div>
                </AnimatedSection>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
      </motion.div>
    </div>
  );
}