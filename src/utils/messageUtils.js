// src/utils/messageUtils.js
import { supabase } from '../supabase/supabaseClient';

export const messageUtils = {
  // Get messages with filtering options
  async getMessages(status = null, limit = null) {
    let query = supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      if (status === 'active') {
        query = query.neq('status', 'archived');
      } else {
        query = query.eq('status', status);
      }
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    return { data, error };
  },

  // Get message counts by status
  async getMessageCounts() {
    const { data, error } = await supabase
      .from('messages')
      .select('status');

    if (error) return { error };

    const counts = {
      total: data.length,
      unread: data.filter(msg => msg.status === 'unread').length,
      read: data.filter(msg => msg.status === 'read').length,
      archived: data.filter(msg => msg.status === 'archived').length,
      active: data.filter(msg => msg.status !== 'archived').length
    };

    return { counts };
  },

  // Bulk update message status
  async bulkUpdateStatus(messageIds, newStatus) {
    const { data, error } = await supabase
      .from('messages')
      .update({ status: newStatus })
      .in('id', messageIds);

    return { data, error };
  },

  // Archive old read messages (calls the database function)
  async archiveOldMessages(daysThreshold = 30) {
    const { data, error } = await supabase
      .rpc('archive_old_messages', { days_threshold: daysThreshold });

    return { data, error };
  },

  // Delete old archived messages (calls the database function)
  async deleteOldArchivedMessages(daysThreshold = 90) {
    const { data, error } = await supabase
      .rpc('delete_old_archived_messages', { days_threshold: daysThreshold });

    return { data, error };
  },

  // Mark multiple messages as read
  async markMultipleAsRead(messageIds) {
    return this.bulkUpdateStatus(messageIds, 'read');
  },

  // Archive multiple messages
  async archiveMultiple(messageIds) {
    return this.bulkUpdateStatus(messageIds, 'archived');
  },

  // Restore archived messages back to read status
  async restoreFromArchive(messageIds) {
    return this.bulkUpdateStatus(messageIds, 'read');
  },

  // Delete messages permanently
  async deleteMessages(messageIds) {
    const { data, error } = await supabase
      .from('messages')
      .delete()
      .in('id', messageIds);

    return { data, error };
  },

  // Search messages
  async searchMessages(searchTerm, status = null) {
    let query = supabase
      .from('messages')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,gmail.ilike.%${searchTerm}%,message.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });

    if (status) {
      if (status === 'active') {
        query = query.neq('status', 'archived');
      } else {
        query = query.eq('status', status);
      }
    }

    const { data, error } = await query;
    return { data, error };
  }
};

// Hook for using message utilities in React components
import { useState, useEffect } from 'react';

export const useMessages = (status = null) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [counts, setCounts] = useState({});

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await messageUtils.getMessages(status);
    if (error) {
      setError(error);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };

  const fetchCounts = async () => {
    const { counts, error } = await messageUtils.getMessageCounts();
    if (!error) {
      setCounts(counts);
    }
  };

  useEffect(() => {
    fetchMessages();
    fetchCounts();
  }, [status]);

  return {
    messages,
    loading,
    error,
    counts,
    refetch: fetchMessages,
    refetchCounts: fetchCounts
  };
};