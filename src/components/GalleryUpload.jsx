// src/components/GalleryUpload.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabaseClient';

const categoryOptions = ['railings', 'balconies', 'fences', 'gates', 'grilles'];

export default function GalleryUpload({ onSuccess }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    if (selected) setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleCategoryToggle = (cat) => {
    setCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleUpload = async () => {
    setStatus('');
    if (!file || categories.length === 0 || categories.length > 3) {
      return setStatus('Please select a file and 1–3 categories.');
    }

    setLoading(true);

    const {
      data: { session },
      error: sessionError
    } = await supabase.auth.getSession();

    if (sessionError || !session?.user) {
      setLoading(false);
      return setStatus('Session error. Please login again.');
    }

    const user = session.user;
    console.log("Supabase user object:", user);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from('gallery').upload(fileName, file);
    if (uploadError) {
      setLoading(false);
      return setStatus('Upload failed: ' + uploadError.message);
    }

    const publicUrl = supabase.storage.from('gallery').getPublicUrl(fileName).data.publicUrl;

    console.log("Insert payload:", {
      image_url: publicUrl,
      categories,
      user_id: user.id
    });

    const { error: insertError } = await supabase.from('gallery').insert([
      {
        image_url: publicUrl,
        categories,
        user_id: user.id
      }
    ]);

    if (insertError) {
      setLoading(false);
      return setStatus('Database error: ' + insertError.message);
    }

    setFile(null);
    setPreviewUrl(null);
    setCategories([]);
    setStatus('Upload successful.');
    setShowToast(true);
    setLoading(false);
    if (onSuccess) onSuccess();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Upload Gallery Image</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Choose Image File</label>
        <div className="relative">
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="imageUpload"
            className="inline-block cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            {file ? file.name : 'Select File'}
          </label>
        </div>
        {previewUrl && (
          <div className="mt-2">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-48 rounded border object-contain"
            />
          </div>
        )}
      </div>

      <div>
        <p className="font-medium text-sm mb-1">Select 1–3 Categories:</p>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((cat) => (
            <label key={cat} className="flex items-center space-x-1 text-sm">
              <input
                type="checkbox"
                checked={categories.includes(cat)}
                onChange={() => handleCategoryToggle(cat)}
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleUpload}
        className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload'}
      </button>

      {status && <p className="text-sm text-gray-600 italic mt-2">{status}</p>}

      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-md">
          Image uploaded successfully ✅
        </div>
      )}
    </div>
  );
}
