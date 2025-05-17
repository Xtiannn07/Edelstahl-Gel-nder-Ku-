import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { selectTranslations } from '../redux/slices/languageSlice';
import AnimatedSection from '../components/AnimatedSection';
import ContactForm from '../components/ContactForm';

// Use client directive for client-side rendering
export default function Contact() {
  const translations = useSelector(selectTranslations);
  const { contact, footer } = translations;
  
  return (
    <div className="min-h-screen max-w-7xl mx-auto mb-16 md:mb-1">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <AnimatedSection animationType="fadeIn"> 
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">{contact.title}</h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-700 text-center">{contact.description}
                </p>
              </div>
            </div>
        </AnimatedSection>
        
        {/* Contact Form and Information */}
        <AnimatedSection>
          <section className=" bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Contact Form */}
                <div className="flex-1 mb-16">
                  <h2 className="text-2xl font-bold mb-6">{contact.title1}</h2>
                  <ContactForm />
                </div>
                
                {/* Contact Information */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-6">{contact.title2}</h2>
                  
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-start">
                      <MapPin size={24} className="text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{contact.address}</h3>
                        <p className="text-gray-600">{footer.address}</p>
                        <p className="text-gray-600">{footer.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone size={24} className="text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{footer.telephone}</h3>
                        <p className="text-gray-600">{footer.mobile}: +49 151 400 504 67</p>
                        <p className="text-gray-600">{footer.telephone}: +49 6646 17 18</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail size={24} className="text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href="mailto:Kus-edelstahl@web.de"
                          className="text-blue-600 hover:underline"
                        >
                          Kus-edelstahl@web.de
                        </a>
                      </div>
                    </div>
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