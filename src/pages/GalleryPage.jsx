import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { 
  fetchGalleryImages, 
  filterGallery,
  selectFilteredGalleryImages,
  selectGalleryStatus,
  selectActiveFilter
} from '../redux/slices/gallerySlice';
import { selectTranslations } from '../redux/slices/languageSlice';
import AnimatedSection from '../components/AnimatedSection';

// Use client directive for client-side rendering
export default function GalleryPage() {
  const dispatch = useDispatch();
  const translations = useSelector(selectTranslations);
  const { gallery } = translations;
  const filteredImages = useSelector(selectFilteredGalleryImages);
  const status = useSelector(selectGalleryStatus);
  const activeFilter = useSelector(selectActiveFilter);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Fetch gallery images when component mounts
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchGalleryImages());
    }
  }, [dispatch, status]);
  
  // Handle filter change
  const handleFilterChange = (category) => {
    dispatch(filterGallery(category));
  };
  
  // Filter categories
  const categories = [
    { id: 'all', label: gallery.all },
    { id: 'railings', label: gallery.railings },
    { id: 'balconies', label: gallery.balconies },
    { id: 'fences', label: gallery.fences },
    { id: 'gates', label: gallery.gates },
    { id: 'grilles', label: gallery.grilles }
  ];
  
  // Display loading state if images are being fetched
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero Section */}
        <AnimatedSection animationType="fadeIn">
          <div className="container mx-auto px-4 py-8">
            <h1 className="font-title text-4xl md:text-5xl font-bold text-center mb-4">{gallery.title}</h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 text-center">{gallery.description}
              </p>
            </div>
          </div>
        </AnimatedSection>
        
        {/* Gallery Section */}
        <AnimatedSection>
          <section className=" bg-white">
            <AnimatedSection>
            {/* Filter Controls */}
            <div className="flex items-center justify-center mb-4 flex-wrap">
                <div className="flex items-center mr-3 text-gray-600 mb-2">
                  <Filter size={18} className="mr-1" />
                  <span className="text-sm">Filter:</span>
                </div>
                <div className="flex flex-wrap justify-center">
                  {categories.map(category => (
                    <motion.button
                      key={category.id}
                      onClick={() => handleFilterChange(category.id)}
                      className={`px-2 sm:px-4 py-2 m-1 rounded-xl text-xs md:text-sm font-medium transition-colors ${
                        activeFilter === category.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>
              </div>
            </AnimatedSection> 
           {/* Gallery Grid */}
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredImages.map(image => (
                    <motion.div
                      key={image.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      className="relative overflow-hidden rounded-lg shadow-md group aspect-w-4 aspect-h-3"
                      style={{ aspectRatio: '4/3' }}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <h3 className="text-white font-semibold">{image.title}</h3>
                        <div className="flex items-center mt-2">
                          <button 
                            className="text-white text-sm flex items-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImage(image);
                            }}
                          >
                            <Maximize2 size={14} className="mr-1" />
                            View larger
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              
              {filteredImages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <ImageIcon size={48} className="mx-auto mb-4 opacity-30" />
                  <p>No images found for the selected filter.</p>
                </div>
              )}
            </div>
          </section>
        </AnimatedSection>
      </motion.div>
      
      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-[90vh] relative"
              onClick={e => e.stopPropagation()}
            >
              <img 
                src={selectedImage.src} 
                alt={selectedImage.alt} 
                className="max-w-full max-h-[80vh] object-contain" 
              />
              <button 
                className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
              <div className="text-white p-4">
                <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// X icon component for modal close button
function X({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}