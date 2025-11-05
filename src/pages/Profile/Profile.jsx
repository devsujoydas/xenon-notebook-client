// Profile.jsx
import { useState } from "react";  
import { motion, AnimatePresence } from "framer-motion";
import UserInformation from './UserInformation' 
import Address from './Address' 
import ChangePassword from './ChangePassword'

const tabs = [
  { name: "User Info", component: <UserInformation /> },
  { name: "Address", component: <Address /> },
  { name: "Change Password", component: <ChangePassword /> },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("User Info");

  return (
    <div className="w-main py-10 min-h-[80dvh]">
      {/* Tabs */}
      <div className="flex border-b border-gray-300 mb-10">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-6 py-3 font-medium transition-all cursor-pointer ${
              activeTab === tab.name
                ? "border-b-4 border-indigo-600 text-indigo-600"
                : "text-gray-600 hover:text-indigo-500"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content with animation */}
      <AnimatePresence mode="wait">
        {tabs.map(
          (tab) =>
            tab.name === activeTab && (
              <motion.div
                key={tab.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {tab.component}
              </motion.div>
            )
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
