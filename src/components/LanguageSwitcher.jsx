import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { toggleLanguage, selectCurrentLanguage, selectTranslations } from '../redux/slices/languageSlice';

export default function LanguageSwitcher() {
  const dispatch = useDispatch();
  const currentLanguage = useSelector(selectCurrentLanguage);
  const translations = useSelector(selectTranslations);
  
  const handleToggle = () => {
    dispatch(toggleLanguage());
  };
  
  return (
    <motion.button 
      onClick={handleToggle}
      className="flex items-center space-x-1 bg-gray-600 text-white px-3 py-1.5 rounded-full 
                hover:bg-blue-700 transition-colors shadow-md font-medium text-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Switch language"
    >
      <Globe size={16} />
      <span className="ml-1">{translations.languageSwitch}</span>
      <span className="sr-only">Current language: {currentLanguage === 'en' ? 'English' : 'German'}</span>
    </motion.button>
  );
}