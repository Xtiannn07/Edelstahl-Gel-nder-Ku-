import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import MessageTabs from './../components/MessageTabs';
import MessageList from './../components/MessageList';
import GalleryUpload from '../components/GalleryUpload';
import { Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const messageRef = useRef(null);
  const [unreadToUpdate, setUnreadToUpdate] = useState(new Set());
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('id', { ascending: false });
    if (!error && data) setMessages(data);
  };

  const queueMarkAsRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: 'read' } : msg))
    );
    setUnreadToUpdate((prev) => new Set(prev).add(id));
  };

  const updateReadMessagesInDB = async () => {
    if (unreadToUpdate.size === 0) return;
    const ids = Array.from(unreadToUpdate);
    const { error } = await supabase.from('messages').update({ status: 'read' }).in('id', ids);
    if (error) {
      console.error('Failed to update messages:', error.message);
    } else {
      setUnreadToUpdate(new Set());
    }
  };

  const toggleMessage = (id, status) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (status !== 'read') queueMarkAsRead(id);
    }
  };

  const handleClickOutside = (e) => {
    if (messageRef.current && !messageRef.current.contains(e.target)) {
      if (expandedId !== null) {
        updateReadMessagesInDB();
        setExpandedId(null);
      }
    }
  };

  useEffect(() => {
    fetchMessages();
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [expandedId]);

  useEffect(() => {
    if (unreadToUpdate.size > 0) {
      updateReadMessagesInDB();
    }
  }, [activeTab]);

  const filteredMessages = messages.filter((msg) => {
    if (activeTab === 'unread') return msg.status !== 'read';
    if (activeTab === 'read') return msg.status === 'read';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-4">{currentUser?.email}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Inbox Messages</h2>
          <button
            onClick={() => setShowGalleryModal(true)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            <Plus size={16} className="mr-2" />
            Upload Gallery Image
          </button>
        </div>

        <MessageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div ref={messageRef} className="mb-12">
          <MessageList
            messages={filteredMessages}
            expandedId={expandedId}
            toggleMessage={toggleMessage}
          />
        </div>
      </div>

      <AnimatePresence>
        {showGalleryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowGalleryModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white p-6 rounded-xl shadow-xl max-w-lg w-full relative border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute -top-3 -right-3 bg-white rounded-full shadow p-1 text-gray-500 hover:text-gray-700"
                onClick={() => setShowGalleryModal(false)}
              >
                <X size={20} />
              </button>
              <GalleryUpload />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
