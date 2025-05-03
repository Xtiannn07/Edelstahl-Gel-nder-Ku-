import { useSelector } from 'react-redux';
import { selectTranslations } from '../redux/slices/languageSlice';
import { motion } from 'framer-motion';

export default function Header() {
  const translations = useSelector(selectTranslations);
  
  return (
    <header className=" w-full bg-gray-800 py-16 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="font-title text-4xl md:text-5xl lg:text-6xl font-bold text-center text-yellow-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {translations.header}
        </motion.h1>
      </div>
    </header>
  );
}