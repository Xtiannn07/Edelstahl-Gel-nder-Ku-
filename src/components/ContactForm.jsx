import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { selectTranslations } from '../redux/slices/languageSlice';

// Reusable contact form component
export default function ContactForm({ onSubmitSuccess }) {
  const translations = useSelector(selectTranslations);
  const { contact } = translations;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: null
  });
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {           
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: false,
        error: 'Please fill out all fields'
      });
      return;
    }
    
    // In a real application, this would submit the form data to a server
    // For now, we'll just simulate a successful submission
    setFormStatus({
      submitted: true,
      error: null
    });
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    
    // Call success callback if provided
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
    
    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        error: null
      });
    }, 5000);
  };
  
  return (
    <div>
      {formStatus.submitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 text-green-700 p-4 rounded-md mb-6"
        >
          Thank you for your message! We'll get back to you soon.
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit}>
          {formStatus.error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
              {formStatus.error}
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">{contact.name}</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">{contact.email}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 mb-2">{contact.message}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          
          <motion.button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send size={18} className="mr-2" />
            {contact.send}
          </motion.button>
        </form>
      )}
    </div>
  );
}