import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Brain, Smile, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const stats = [
    { label: 'Days Active', value: '12', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Journal Entries', value: '8', icon: Heart, color: 'text-red-600' },
    { label: 'Mood Score', value: '7.2', icon: Smile, color: 'text-yellow-600' },
    { label: 'Mindful Minutes', value: '45', icon: Brain, color: 'text-purple-600' },
  ];

  const recentActivities = [
    { activity: 'Completed morning meditation', time: '2 hours ago', type: 'meditation' },
    { activity: 'Wrote a journal entry', time: '1 day ago', type: 'journal' },
    { activity: 'Chatted with wellness assistant', time: '2 days ago', type: 'chat' },
    { activity: 'Reviewed mood analytics', time: '3 days ago', type: 'analytics' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back to SATTVA</h2>
        <p className="text-gray-600">
          Your journey to mental wellness continues. How are you feeling today?
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-center">
            <div className="text-2xl mb-2">📝</div>
            <span className="text-sm font-medium text-gray-700">Write Journal</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-center">
            <div className="text-2xl mb-2">🤖</div>
            <span className="text-sm font-medium text-gray-700">Chat Assistant</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-center">
            <div className="text-2xl mb-2">📊</div>
            <span className="text-sm font-medium text-gray-700">View Analytics</span>
          </button>
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-center">
            <div className="text-2xl mb-2">🧘</div>
            <span className="text-sm font-medium text-gray-700">Meditate</span>
          </button>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'meditation' ? 'bg-purple-500' :
                activity.type === 'journal' ? 'bg-green-500' :
                activity.type === 'chat' ? 'bg-blue-500' : 'bg-orange-500'
              }`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;