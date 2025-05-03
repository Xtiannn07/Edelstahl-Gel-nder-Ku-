import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Award, 
  Shield, 
  Clock
} from 'lucide-react';
import { 
  fetchServices, 
  selectServicesTitle,
  selectServicesItems,
  selectServicesStatus,
  selectLastFetchedLanguage
} from '../redux/slices/servicesSlice';
import { selectCurrentLanguage, selectTranslations } from '../redux/slices/languageSlice';
import AnimatedSection from '../components/AnimatedSection';

// Use client directive for client-side rendering
export default function ServicesPage() {
  const dispatch = useDispatch();
  const translations = useSelector(selectTranslations);
  const currentLanguage = useSelector(selectCurrentLanguage);
  const title = useSelector(selectServicesTitle);
  const items = useSelector(selectServicesItems);
  const status = useSelector(selectServicesStatus);
  const lastFetchedLanguage = useSelector(selectLastFetchedLanguage);
  
  // Fetch services data if not already fetched in current language
  useEffect(() => {
    if (status === 'idle' || lastFetchedLanguage !== currentLanguage) {
      dispatch(fetchServices(currentLanguage));
    }
  }, [dispatch, status, currentLanguage, lastFetchedLanguage]);
  
  // Display loading state if services are being fetched
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // Benefits section data
  const benefits = [
    {
      icon: <CheckCircle2 size={24} className="text-green-600" />,
      title: "High-Quality Materials",
      description: "We use only the finest stainless steel to ensure durability and longevity."
    },
    {
      icon: <Award size={24} className="text-yellow-600" />,
      title: "Expert Craftsmanship",
      description: "Our skilled artisans bring years of experience to every project."
    },
    {
      icon: <Shield size={24} className="text-blue-600" />,
      title: "Warranty Included",
      description: "All our products come with a comprehensive warranty for your peace of mind."
    },
    {
      icon: <Clock size={24} className="text-purple-600" />,
      title: "Timely Delivery",
      description: "We respect deadlines and ensure prompt project completion."
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
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">{title}</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 text-center">
                Custom stainless steel solutions for your home and business, crafted with precision and care.
              </p>
            </div>
          </div>
        </section>
        
        {/* Services List */}
        <AnimatedSection>
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {items.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-start p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <div>
                      <h3 className="font-medium mb-1">{item}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        {/* Benefits Section */}
        <AnimatedSection animationType="fadeIn">
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="p-6 bg-white rounded-lg shadow-sm text-center"
                  >
                    <div className="flex justify-center mb-4">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedSection>
        
        {/* Call to Action */}
        <AnimatedSection>
          <section className="py-16 bg-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">{translations.contact.title}</h2>
              <p className="mb-8 max-w-2xl mx-auto">
                Ready to start your project? Contact us today for a consultation and quote.
              </p>
              <motion.a
                href="/contact"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {translations.contact.title}
              </motion.a>
            </div>
          </section>
        </AnimatedSection>
      </motion.div>
    </div>
  );
}