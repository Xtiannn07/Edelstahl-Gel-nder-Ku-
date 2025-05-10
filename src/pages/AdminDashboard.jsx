import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabaseClient';
import { ChevronDown, ChevronUp } from 'lucide-react';

const AdminDashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

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
    if (!error) setMessages(data);
  };

  const markAsRead = async (id) => {
    await supabase.from('messages').update({ status: 'read' }).eq('id', id);
    setMessages((prev) => prev.map((msg) => (msg.id === id ? { ...msg, status: 'read' } : msg)));
  };

  const toggleMessage = (id, status) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (status !== 'read') markAsRead(id);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`border rounded-md ${msg.status === 'read' ? 'bg-white' : 'bg-gray-50'} shadow-sm`}
            >
              <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleMessage(msg.id, msg.status)}>
                <span className="font-medium text-gray-800">{msg.gmail}</span>
                {expandedId === msg.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {expandedId === msg.id && (
                <div className="px-4 pb-4 text-gray-700">
                  <p><strong>Name:</strong> {msg.name}</p>
                  <p className="mt-2 whitespace-pre-line">{msg.message}</p>
                </div>
              )}
            </div>
          ))}
          {messages.length === 0 && <p className="text-gray-500">No messages found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
