import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Image, X } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';
import AnimatedSection from './AnimatedSection';
import { selectTranslations } from '../redux/slices/languageSlice';
import { useSelector } from 'react-redux';

// Change categories here if needed:
const CATEGORIES = ['balconies', 'fences', 'gates', 'grilles','stairs'];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false); // Start with false, will set to true only if needed
  const [selectedImage, setSelectedImage] = useState(null);
  const [columns, setColumns] = useState(3);
  const modalRef = useRef(null);
  const translations = useSelector(selectTranslations);
  const { gallery } = translations;

  // Cache configuration
  const CACHE_KEY = 'gallery_preview_images';
  const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Function to get cached data
  const getCachedImages = () => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          return data;
        }
      }
    } catch (error) {
      console.warn('Error reading cache:', error);
    }
    return null;
  };

  // Function to cache data
  const setCachedImages = (data) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data,
        timestamp: Date.now()
      }));
    } catch (error) {
      console.warn('Error caching data:', error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      // Check cache first
      const cachedImages = getCachedImages();
      if (cachedImages) {
        setImages(cachedImages);
        return; // Use cached data, no loading needed
      }

      // Only show loading if we need to fetch from server
      setLoading(true);
      
      // Fetch a bunch, newest first
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (!error && data) {
        // Group by category, pick top 2 per category
        const imagesByCat = {};
        for (let cat of CATEGORIES) imagesByCat[cat] = [];
        for (let img of data) {
          if (Array.isArray(img.categories)) {
            img.categories.forEach(cat => {
              if (CATEGORIES.includes(cat) && imagesByCat[cat].length < 2) {
                imagesByCat[cat].push(img);
              }
            });
          }
        }
        // Flatten, dedupe by id
        const deduped = [];
        const seen = new Set();
        for (let cat of CATEGORIES) {
          for (let img of imagesByCat[cat]) {
            if (!seen.has(img.id)) {
              deduped.push(img);
              seen.add(img.id);
            }
          }
        }
        setImages(deduped);
        setCachedImages(deduped); // Cache the processed data
      }
      setLoading(false);
    };
    fetchImages();
  }, []);

  // Responsive columns
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setColumns(1);
      } else if (window.innerWidth < 768) {
        setColumns(2);
      } else {
        setColumns(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modal open/close
  const openImagePreview = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // ESC to close modal
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) closeImagePreview();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Loading state
  if (loading) {
    // Create skeleton masonry layout
    const skeletonColumns = Array.from({ length: columns }, (_, colIndex) => {
      // Distribute skeleton cards across columns
      const itemsPerColumn = Math.ceil(10 / columns);
      return Array.from({ length: itemsPerColumn }, (_, itemIndex) => ({
        id: `skeleton-${colIndex}-${itemIndex}`,
        height: Math.floor(Math.random() * 100 + 200) // Random heights for masonry effect
      }));
    });

    return (
      <AnimatedSection>
        <section>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center mb-2 md:mb-8">
              <h2 className="ml-2 text-xl md:text-3xl font-bold text-stone-100">
                Loading Gallery...
              </h2>
              <div className="h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Skeleton Masonry Grid */}
            <div className="flex flex-wrap -mx-2">
              {skeletonColumns.map((column, columnIndex) => (
                <div
                  key={`skeleton-column-${columnIndex}`}
                  className={`px-2 w-full sm:w-1/2 ${columns === 3 ? 'md:w-1/3' : ''}`}
                >
                  <div className="flex flex-col space-y-4">
                    {column.map((skeleton) => (
                      <div key={skeleton.id} className="animate-pulse">
                        <div
                          className="bg-gray-200 rounded-lg shadow-md overflow-hidden"
                          style={{ height: `${skeleton.height}px` }}
                        >
                          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>
    );
  }

  // No images
  if (!images || images.length === 0) {
    return null;
  }

  // Masonry layout
  const createMasonryLayout = () => {
    const columnArrays = Array.from({ length: columns }, () => []);
    images.forEach((image, index) => {
      const columnIndex = index % columns;
      columnArrays[columnIndex].push(image);
    });
    return columnArrays;
  };

  const masonryColumns = createMasonryLayout();

  return (
    <AnimatedSection>
      <section>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-2 md:mb-8">
            <h2 className="ml-2 text-xl md:text-3xl font-bold text-stone-100">
              {gallery.title}
            </h2>
            <Link
              to="/gallery"
              className="flex items-center text-sm text-stone-100 hover:text-blue-500 hover:underline transition-colors"
            >
              <span className="mr-1 justify-center">{gallery.cta}</span>
              <ArrowRight size={24} />
            </Link>
          </div>

          {/* Masonry Grid */}
          <div className="flex flex-wrap -mx-2">
            {masonryColumns.map((column, columnIndex) => (
              <div
                key={`column-${columnIndex}`}
                className={`px-2 w-full sm:w-1/2 ${columns === 3 ? 'md:w-1/3' : ''}`}
              >
                <div className="flex flex-col space-y-4">
                  {column.map((image) => (
                    <AnimatedSection animationType="slideUp" key={image.id} className="relative">
                      <motion.div
                        key={image.id}
                        whileHover={{ y: -5 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-lg shadow-md"
                      >
                        <div
                          className="relative cursor-pointer"
                          onClick={() => openImagePreview(image)}
                        >
                          <img
                            src={image.image_url}
                            alt={image.title || "Gallery image"}
                            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <h3 className="text-white font-semibold">{image.title}</h3>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile "View All" button */}
          <div className="pb-8 mt-8 text-center sm:hidden">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              <Image size={18} className="mr-2" />
              {gallery.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImagePreview}
          >
            <motion.div
              ref={modalRef}
              className="relative rounded-lg overflow-hidden bg-white inline-flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white bg-black/40 p-2 rounded-full hover:bg-black/60 z-10"
                onClick={closeImagePreview}
              >
                <X size={24} />
              </button>

              <img
                src={selectedImage.image_url}
                alt={selectedImage.title || "Gallery Preview"}
                className="max-w-[80vw] max-h-[70vh] object-contain"
              />

              {(selectedImage.title || selectedImage.description) && (
                <div className="p-3 w-full">
                  {selectedImage.title && (
                    <h3 className="text-lg font-bold">{selectedImage.title}</h3>
                  )}
                  {selectedImage.description && (
                    <p className="text-gray-600 text-sm mt-1">{selectedImage.description}</p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedSection>
  );
}
