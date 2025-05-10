// src/components/ContactForm.jsx
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Send, LogOut, LogIn } from 'lucide-react';
import { supabase } from '../supabase/supabaseClient';
import { selectTranslations } from '../redux/slices/languageSlice';

export default function ContactForm() {
  const translations = useSelector(selectTranslations);
  const { contact } = translations;

  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState({ submitted: false, error: null });

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user) {
        const user = session.user;
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
        setFormData((prev) => ({ ...prev, name: fullName }));
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
      if (session?.user) {
        const user = session.user;
        const fullName = user.user_metadata?.full_name || user.user_metadata?.name || '';
        setFormData((prev) => ({ ...prev, name: fullName }));
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) {
      return setStatus({ submitted: false, error: 'All fields required.' });
    }
    if (!session) {
      await supabase.auth.signInWithOAuth({ provider: 'google' });
      return;
    }
    const user = session.user;
    const { error } = await supabase.from('messages').insert({
      uuid: user.id,
      name: formData.name,
      gmail: user.email,
      message: formData.message,
    });
    if (error) return setStatus({ submitted: false, error: error.message });
    setStatus({ submitted: true, error: null });
    setFormData({ name: '', message: '' });
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google' });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  return (
    <div>
      {!session && (
        <motion.button
          type="button"
          onClick={handleLogin}
          className="mb-6 bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-blue-700"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <LogIn size={18} className="mr-2" />
          {contact.login_message}
        </motion.button>
      )}

      {status.submitted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-100 text-green-700 p-4 rounded-md mb-6"
        >
          Thank you for your message! We'll get back to you soon.
        </motion.div>
      )}
      {status.error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">{status.error}</div>
      )}

      <form onSubmit={handleSubmit} className={`space-y-4 ${!session ? 'pointer-events-none blur-sm opacity-50' : ''}`}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">{contact.name}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
            disabled={!session}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="message" className="block text-gray-700 mb-2">{contact.message}</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
            disabled={!session}
          ></textarea>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <motion.button
            type="submit"
            className="min-w-[150px] bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-blue-700"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!session}
          >
            <Send size={18} className="mr-2" />
            {session ? contact.send : 'Login with Gmail to Send'}
          </motion.button>

          {session && (
            <motion.button
              type="button"
              onClick={handleLogout}
              className="min-w-[150px] bg-red-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center hover:bg-red-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <LogOut size={18} className="mr-2" />
              {contact.logout}
            </motion.button>
          )}
        </div>
      </form>
    </div>
  );
}
