import React from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, Calendar, Target, Award } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Sample data for charts
  const moodData = [
    { date: 'Mon', mood: 7, anxiety: 3, energy: 8 },
    { date: 'Tue', mood: 6, anxiety: 4, energy: 6 },
    { date: 'Wed', mood: 8, anxiety: 2, energy: 9 },
    { date: 'Thu', mood: 5, anxiety: 6, energy: 5 },
    { date: 'Fri', mood: 7, anxiety: 3, energy: 7 },
    { date: 'Sat', mood: 9, anxiety: 1, energy: 9 },
    { date: 'Sun', mood: 8, anxiety: 2, energy: 8 },
  ];

  const activityData = [
    { activity: 'Meditation', minutes: 120 },
    { activity: 'Journaling', minutes: 45 },
    { activity: 'Exercise', minutes: 90 },
    { activity: 'Reading', minutes: 60 },
    { activity: 'Sleep', minutes: 480 },
  ];

  const emotionData = [
    { name: 'Happy', value: 35, color: '#10B981' },
    { name: 'Calm', value: 25, color: '#3B82F6' },
    { name: 'Anxious', value: 20, color: '#F59E0B' },
    { name: 'Sad', value: 12, color: '#EF4444' },
    { name: 'Excited', value: 8, color: '#8B5CF6' },
  ];

  const achievements = [
    { title: '7 Day Streak', description: 'Consistent journaling', icon: '🔥', completed: true },
    { title: 'Mindful Week', description: '5+ meditation sessions', icon: '🧘', completed: true },
    { title: 'Early Bird', description: 'Morning routine for 3 days', icon: '🌅', completed: false },
    { title: 'Gratitude Master', description: '10 gratitude entries', icon: '🙏', completed: false },
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
      {/* Header */}
      <motion.div variants={itemVariants} className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Track your mental wellness journey</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="text-gray-400" size={20} />
          <span className="text-sm text-gray-600">Last 7 days</span>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Average Mood', value: '7.3/10', trend: '+0.5', icon: TrendingUp, color: 'text-green-600' },
          { label: 'Meditation Minutes', value: '45', trend: '+12', icon: Target, color: 'text-blue-600' },
          { label: 'Journal Entries', value: '8', trend: '+2', icon: Calendar, color: 'text-purple-600' },
          { label: 'Achievements', value: '2', trend: '0', icon: Award, color: 'text-orange-600' },
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`h-6 w-6 ${metric.color}`} />
                <span className={`text-sm font-medium ${
                  parseFloat(metric.trend) > 0 ? 'text-green-600' : 
                  parseFloat(metric.trend) < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {parseFloat(metric.trend) > 0 ? '+' : ''}{metric.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          );
        })}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Mood Trends */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Mood & Energy Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={moodData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} domain={[0, 10]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="energy" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Activity Breakdown */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity (Minutes)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis type="number" stroke="#6b7280" fontSize={12} />
                <YAxis type="category" dataKey="activity" stroke="#6b7280" fontSize={12} width={80} />
                <Tooltip />
                <Bar dataKey="minutes" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Emotion Distribution */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emotion Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={emotionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {emotionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {emotionData.map((emotion) => (
              <div key={emotion.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: emotion.color }}
                />
                <span className="text-sm text-gray-600">{emotion.name} ({emotion.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-4 p-3 rounded-lg border ${
                  achievement.completed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    achievement.completed ? 'text-green-900' : 'text-gray-900'
                  }`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${
                    achievement.completed ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>
                </div>
                {achievement.completed && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;