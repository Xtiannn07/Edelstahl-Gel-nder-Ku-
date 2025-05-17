// src/pages/GalleryPage.jsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { supabase } from '../supabase/supabaseClient';
import { selectTranslations } from '../redux/slices/languageSlice';
import AnimatedSection from '../components/AnimatedSection';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const translations = useSelector(selectTranslations);
  const { gallery } = translations;

  // Map value (used for filtering) to label (used for display)
  const categoryDefs = [
    { value: 'all', label: gallery.all },
    { value: 'railings', label: gallery.railings },
    { value: 'balconies', label: gallery.balconies },
    { value: 'fences', label: gallery.fences },
    { value: 'gates', label: gallery.gates },
    { value: 'grilles', label: gallery.grilles }
  ];

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setImages(data);
      setLoading(false);
    };

    fetchImages();
  }, []);

  // Only filter by value, not by label (translations)
  const filtered = activeFilter === 'all'
    ? images
    : images.filter(img =>
        Array.isArray(img.categories) &&
        img.categories.includes(activeFilter)
      );

  return (
    <div className="min-h-screen pb-16">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <AnimatedSection animationType="fadeIn">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-4">{gallery.title}</h1>
            <p className="text-center text-gray-600 mb-8">{gallery.description}</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {categoryDefs.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setActiveFilter(cat.value)}
                  className={`px-3 py-1 rounded-full text-sm ${activeFilter === cat.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                {filtered.map(image => (
                  <AnimatedSection key={image.id} animationType="fadeIn">
                    <div
                      key={image.id}
                      className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow group relative cursor-pointer"
                      style={{ aspectRatio: '4 / 3' }}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image.image_url}
                        alt={`Gallery - ${image.categories}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {filtered.length === 0 && (
                <div className="text-center text-gray-500 py-8">No images found.</div>
              )}
            </>
          )}
        </AnimatedSection>

        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <div className="max-w-4xl max-h-[90vh] relative" onClick={e => e.stopPropagation()}>
              <img
                src={selectedImage.image_url}
                alt="Preview"
                className="max-w-full max-h-[80vh] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black"
              >✕</button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
