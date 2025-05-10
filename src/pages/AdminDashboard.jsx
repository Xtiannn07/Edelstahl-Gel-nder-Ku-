import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import MessageTabs from './../components/MessageTabs';
import MessageList from './../components/MessageList';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const messageRef = useRef(null);
  const [unreadToUpdate, setUnreadToUpdate] = useState(new Set());

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
    console.log('Updating read status for IDs:', ids);
    const { error } = await supabase.from('messages').update({ status: 'read' }).in('id', ids);
    if (error) {
      console.error('Failed to update messages:', error.message);
    } else {
      console.log('Messages marked as read.');
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
        <h2 className="text-2xl font-bold mb-6">Inbox Messages</h2>
        <MessageTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <div ref={messageRef}>
          <MessageList
            messages={filteredMessages}
            expandedId={expandedId}
            toggleMessage={toggleMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

