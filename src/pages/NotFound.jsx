import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Home } from 'lucide-react';

// Use client directive for client-side rendering
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center"
      >
        <AlertCircle size={64} className="mx-auto mb-6 text-red-500" />
        
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link 
            to="/" 
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}