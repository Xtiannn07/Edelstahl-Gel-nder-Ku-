import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Image, X } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';
import AnimatedSection from './AnimatedSection';

export default function Gallery({ translations }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [columns, setColumns] = useState(3);
  const modalRef = useRef(null);

  // Fetch latest 6 images from Supabase
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      if (!error && data) setImages(data);
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
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
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

  // Default fallback translations
  const galleryTitle = translations?.gallery?.title || "Our Work";
  const galleryCTA = translations?.gallery?.cta || "View All";

  return (
    <AnimatedSection>
      <section>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-2 md:mb-8">
            <h2 className="ml-2 text-xl md:text-3xl font-bold text-stone-100">
              {galleryTitle}
            </h2>
            <Link
              to="/gallery"
              className="flex items-center text-sm text-stone-100 hover:text-blue-500 hover:underline transition-colors"
            >
              <span className="mr-1 justify-center">{galleryCTA}</span>
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
              {galleryCTA}
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
