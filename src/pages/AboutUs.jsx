import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Award, Wrench, Clock, Users } from 'lucide-react';
import { selectTranslations } from '../redux/slices/languageSlice';
import AnimatedSection from '../components/AnimatedSection';

// Use client directive for client-side rendering
export default function AboutUs() {
  const translations = useSelector(selectTranslations);
  const { about } = translations;
  
  // Features with icons
  const features = [
    {
      icon: <Award size={24} className="text-blue-600" />,
      title: about.item1_title,
      description: about.item1_des
    },
    {
      icon: <Wrench size={24} className="text-blue-600" />,
      title: about.item2_title,
      description: about.item2_des
    },
    {
      icon: <Clock size={24} className="text-blue-600" />,
      title: about.item3_title,
      description: about.item3_des
    },
    {
      icon: <Users size={24} className="text-blue-600" />,
      title: about.item4_title,
      description: about.item4_des
    }
  ];
  
  return (
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">{about.title}</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 text-center">
                {about.description}
              </p>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <AnimatedSection>
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">{about.title2}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="p-6 border border-gray-200 rounded-lg text-center hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        {/* Company History */}
        <AnimatedSection animationType="fadeIn">
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">{about.history}</h2>
              <div className="max-w-3xl mx-auto">
                <p className="text-gray-700 mb-4">{about.des1}</p>
                <p className="text-gray-700 mb-4">{about.des2} </p>
                <p className="text-gray-700">{about.des3}</p>
              </div>
            </div>
          </section>
        </AnimatedSection>
      </motion.div>
    </div>
  );
}