import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Image } from 'lucide-react';
import { selectFilteredGalleryImages, selectGalleryStatus } from '../redux/slices/gallerySlice';
import { selectTranslations } from '../redux/slices/languageSlice';
import AnimatedSection from './AnimatedSection';

// Component for showcasing gallery images on the home page
export default function Gallery() {
  const translations = useSelector(selectTranslations);
  const images = useSelector(selectFilteredGalleryImages);
  const status = useSelector(selectGalleryStatus);
  
  // Limit to 6 images for the preview
  const previewImages = images.slice(0, 6);
  
  // Display loading state if images are being fetched
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  // If no images are available
  if (previewImages.length === 0) {
    return null;
  }
  
  return (
    <AnimatedSection>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">{translations.gallery.title}</h2>
            <Link 
              to="/gallery" 
              className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span className="mr-1">View all</span>
              <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewImages.map(image => (
              <motion.div
                key={image.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden rounded-lg shadow-md"
              >
                <Link to="/gallery" className="block aspect-w-4 aspect-h-3 relative overflow-hidden">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h3 className="text-white font-semibold">{image.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile View All Button */}
          <div className="mt-8 text-center sm:hidden">
            <Link 
              to="/gallery" 
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              <Image size={18} className="mr-2" />
              View All Gallery
            </Link>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}