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
  const [loading, setLoading] = useState(false); // Start with false, will set to true only if needed
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  const translations = useSelector(selectTranslations);
  const { gallery } = translations;
  const { currentUser } = useAuth();

  // Cache configuration
  const CACHE_KEY = 'gallery_all_images';
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

  // Function to clear cache (useful when images are deleted/added)
  const clearCache = () => {
    try {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem('gallery_preview_images'); // Also clear preview cache
    } catch (error) {
      console.warn('Error clearing cache:', error);
    }
  };

  const categoryDefs = [
    { value: 'all', label: gallery.all },
    { value: 'balconies', label: gallery.balconies },
    { value: 'fences', label: gallery.fences },
    { value: 'gates', label: gallery.gates },
    { value: 'grilles', label: gallery.grilles },
    { value: 'stairs', label: gallery.stairs },
  ];

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUserProfile();
    }
  }, [currentUser]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const fetchUserProfile = async () => {
    if (!currentUser) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (!error && data) {
        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchImages = async () => {
    // Check cache first
    const cachedImages = getCachedImages();
    if (cachedImages) {
      setImages(cachedImages);
      return; // Use cached data, no loading needed
    }

    // Only show loading if we need to fetch from server
    setLoading(true);
    
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setImages(data);
      setCachedImages(data); // Cache the data
    }
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
    clearCache(); // Clear cache when image is deleted
    setMenuOpenId(null);
    setConfirmDeleteId(null);
    setToastMessage('Image deleted successfully.');
  };

  // Check if user has delete permissions
  const canDelete = currentUser && userProfile && userProfile.role === 'admin';

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div
                    className="bg-gray-200 rounded-lg shadow overflow-hidden"
                    style={{ aspectRatio: '4 / 3' }}
                  >
                    <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
                  </div>
                </div>
              ))}
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
                      {canDelete && (
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
          <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            onClick={() => setConfirmDeleteId(null)}
          >
            <div 
              className="bg-white p-6 rounded shadow-lg w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
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