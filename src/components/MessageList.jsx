// src/admin/MessageList.jsx
import { ChevronDown, ChevronUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const MessageList = ({ messages, expandedId, toggleMessage }) => {
  const sortedMessages = [...messages].sort((a, b) => {
    const dateA = new Date(a.created_at || 0);
    const dateB = new Date(b.created_at || 0);
    return dateB - dateA;
  });

  return (
    <div className="space-y-4">
      {sortedMessages.map((msg) => (
        <div
          key={msg.id}
          className={`transition-all duration-300 border rounded-md shadow-sm ${
            msg.status === 'read' ? 'bg-white' : 'bg-gray-200'
          }`}
        >
          <div
            className="flex justify-between items-center p-4 cursor-pointer"
            onClick={() => toggleMessage(msg.id, msg.status)}
          >
            <div>
              <p className="font-medium text-gray-800">{msg.gmail}</p>
              {msg.created_at && (
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(msg.created_at), { addSuffix: true })}
                </p>
              )}
            </div>
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
      {messages.length === 0 && (
        <p className="text-gray-500 text-center py-8">No messages in this category.</p>
      )}
    </div>
  );
};

export default MessageList;
