import { ChevronDown, ChevronUp, Archive, Trash2, RotateCcw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

const MessageList = ({ 
  messages, 
  expandedId, 
  toggleMessage, 
  archiveMessage, 
  restoreMessage,
  deleteMessage, 
  activeTab 
}) => {
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const sortedMessages = [...messages].sort((a, b) => {
    const dateA = new Date(a.created_at || 0);
    const dateB = new Date(b.created_at || 0);
    return dateB - dateA;
  });

  const handleArchive = (e, id) => {
    e.stopPropagation();
    archiveMessage(id);
  };

  const handleRestore = (e, id) => {
    e.stopPropagation();
    restoreMessage(id);
  };

  const handleDeleteClick = (e, id) => {
    e.stopPropagation();
    setConfirmDeleteId(id);
  };

  const confirmDelete = () => {
    if (confirmDeleteId) {
      deleteMessage(confirmDeleteId);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      {sortedMessages.map((msg) => (
        <div
          key={msg.id}
          className={`transition-all duration-200 border rounded-md shadow-sm ${
            msg.status === 'read' ? 'bg-white border-gray-300' : 'bg-blue-50 border-blue-300'
          }`}
        >
          <div
            className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleMessage(msg.id, msg.status)}
          >
            <div className="flex-1">
              <div className="flex items-center">
                <p className="font-medium text-gray-800">{msg.gmail}</p>
                {msg.status !== 'read' && (
                  <span className="ml-2 inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                )}
              </div>
              {msg.created_at && (
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {activeTab === 'archived' ? (
                <button
                  onClick={(e) => handleRestore(e, msg.id)}
                  className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded transition-colors"
                  title="Restore message"
                >
                  <RotateCcw size={16} />
                </button>
              ) : (
                <button
                  onClick={(e) => handleArchive(e, msg.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
                  title="Archive message"
                >
                  <Archive size={16} />
                </button>
              )}
              
              <button
                onClick={(e) => handleDeleteClick(e, msg.id)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors"
                title="Delete message permanently"
              >
                <Trash2 size={16} />
              </button>
              
              {expandedId === msg.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>
          </div>
          
          {expandedId === msg.id && (
            <div className="px-4 pb-4 text-gray-700 border-t bg-gray-50">
              <div className="pt-4">
                <p><strong>Name:</strong> {msg.name}</p>
                <p className="mt-3 whitespace-pre-line leading-relaxed">{msg.message}</p>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {messages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {activeTab === 'archived' 
              ? 'No archived messages.' 
              : 'No messages found.'
            }
          </p>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-200">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Message
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to permanently delete this message? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;