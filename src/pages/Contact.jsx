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
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">{contact.title}</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 text-center">
                Have a question or want to discuss your project? Get in touch with us today.
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Form and Information */}
        <AnimatedSection>
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row gap-12">
                {/* Contact Form */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <ContactForm />
                </div>
                
                {/* Contact Information */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-start">
                      <MapPin size={24} className="text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Address</h3>
                        <p className="text-gray-600">{footer.address}</p>
                        <p className="text-gray-600">{footer.country}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone size={24} className="text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Phone</h3>
                        <p className="text-gray-600">{footer.mobile}: +49 151 400 504 67</p>
                        <p className="text-gray-600">{footer.telephone}: +49 6646 17 18</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail size={24} className="text-blue-600 mr-4 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">Email</h3>
                        <a
                          href="mailto:kessler-waldemar@t-online.de"
                          className="text-blue-600 hover:underline"
                        >
                          kessler-waldemar@t-online.de
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