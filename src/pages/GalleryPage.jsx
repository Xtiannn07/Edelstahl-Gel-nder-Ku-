// src/pages/GalleryPage.jsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { supabase } from '../supabase/supabaseClient';
import { selectTranslations } from '../redux/slices/languageSlice';
import AnimatedSection from '../components/AnimatedSection';
import { MoreVertical } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const translations = useSelector(selectTranslations);
  const { gallery } = translations;
  const { currentUser } = useAuth();

  const categoryDefs = [
    { value: 'all', label: gallery.all },
    { value: 'railings', label: gallery.railings },
    { value: 'balconies', label: gallery.balconies },
    { value: 'fences', label: gallery.fences },
    { value: 'gates', label: gallery.gates },
    { value: 'grilles', label: gallery.grilles }
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const fetchImages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) setImages(data);
    setLoading(false);
  };

  const deleteImage = async (id) => {
    const imageToDelete = images.find((img) => img.id === id);
    if (!imageToDelete) return;

    const imageUrl = imageToDelete.image_url;
    const imagePath = imageUrl.split('/').slice(-1)[0];

    const { error: storageError } = await supabase.storage
      .from('gallery')
      .remove([imagePath]);

    if (storageError) {
      console.error('Storage deletion failed:', storageError.message);
      setToastMessage('Failed to delete image from storage.');
      return;
    }

    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (error) {
      console.error('Error deleting image:', error.message);
      setToastMessage('Failed to delete image.');
      return;
    }

    setImages((prev) => prev.filter((img) => img.id !== id));
    setMenuOpenId(null);
    setConfirmDeleteId(null);
    setToastMessage('Image deleted successfully.');
  };

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
                      className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg shadow group relative"
                      style={{ aspectRatio: '4 / 3' }}
                    >
                      <img
                        src={image.image_url}
                        alt={`Gallery - ${image.categories}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onClick={() => setSelectedImage(image)}
                      />
                      {currentUser && (
                        <div className="absolute top-2 right-2 z-10">
                          <button
                            className="p-1 rounded-lg shadow bg-white/30 hover:bg-gray-100 backdrop-blur-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuOpenId(menuOpenId === image.id ? null : image.id);
                            }}
                          >
                            <MoreVertical size={20} className="text-black/50"/>
                          </button>
                          {menuOpenId === image.id && (
                            <div className="absolute right-0 mt-2 bg-white border shadow rounded p-2">
                              <button
                                onClick={() => setConfirmDeleteId(image.id)}
                                className="text-sm text-red-500 hover:underline"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      )}
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

        {confirmDeleteId && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
              <p className="mb-4 text-gray-800">Are you sure you want to delete this image?</p>
              <div className="flex justify-end gap-2">
                <button
                  className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => deleteImage(confirmDeleteId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {toastMessage && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow z-50">
            {toastMessage}
          </div>
        )}

        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
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
