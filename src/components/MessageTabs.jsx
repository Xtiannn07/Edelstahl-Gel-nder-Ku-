const MessageTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex space-x-4 mb-6">
      {['all', 'unread', 'read'].map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};
export default MessageTabs;
