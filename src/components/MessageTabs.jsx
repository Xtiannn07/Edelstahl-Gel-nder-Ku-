import { Archive, Trash2 } from 'lucide-react';

const MessageTabs = ({ activeTab, setActiveTab, deleteAllArchived }) => {
  const handleDeleteAllArchived = async () => {
    if (window.confirm('Are you sure you want to permanently delete all archived messages?')) {
      await deleteAllArchived();
    }
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex space-x-4">
        <button
          onClick={() => handleTabSwitch('all')}
          className={`px-4 py-2 rounded flex items-center transition-colors ${
            activeTab === 'all' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          All Messages
        </button>
        
        <button
          onClick={() => handleTabSwitch('archived')}
          className={`px-4 py-2 rounded flex items-center transition-colors ${
            activeTab === 'archived' 
              ? 'bg-gray-700 text-white' 
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          <Archive size={16} className="mr-2" />
          Archived
        </button>
      </div>

      {activeTab === 'archived' && (
        <button
          onClick={handleDeleteAllArchived}
          className="flex items-center px-4 py-2 bg-gray-700 text-white rounded hover:bg-red-800 transition-colors"
        >
          <Trash2 size={16} className="mr-2" />
          Delete All Archived
        </button>
      )}
    </div>
  );
};

export default MessageTabs;