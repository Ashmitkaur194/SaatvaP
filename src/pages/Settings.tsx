import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Shield, User, Moon, Globe, Download, Trash2 } from 'lucide-react';

const Settings: React.FC = () => {
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    moodAlerts: true,
    journalReminders: false,
    weeklyReports: true,
  });

  const [privacy, setPrivacy] = useState({
    dataAnalytics: true,
    shareAnonymousData: false,
    localStorage: true,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'en',
    timezone: 'auto',
  });

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

  const SettingSection: React.FC<{ 
    title: string; 
    description: string; 
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ title, description, icon, children }) => (
    <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </motion.div>
  );

  const ToggleSetting: React.FC<{
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
  }> = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-indigo-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Customize your SATTVA experience</p>
      </motion.div>

      {/* Notifications */}
      <SettingSection
        title="Notifications"
        description="Manage your notification preferences"
        icon={<Bell className="text-indigo-600" size={20} />}
      >
        <ToggleSetting
          label="Daily Reminders"
          description="Get reminded to check in with your mood daily"
          checked={notifications.dailyReminders}
          onChange={(checked) => setNotifications({ ...notifications, dailyReminders: checked })}
        />
        <ToggleSetting
          label="Mood Alerts"
          description="Receive alerts when concerning patterns are detected"
          checked={notifications.moodAlerts}
          onChange={(checked) => setNotifications({ ...notifications, moodAlerts: checked })}
        />
        <ToggleSetting
          label="Journal Reminders"
          description="Get reminded to write in your journal"
          checked={notifications.journalReminders}
          onChange={(checked) => setNotifications({ ...notifications, journalReminders: checked })}
        />
        <ToggleSetting
          label="Weekly Reports"
          description="Receive weekly summaries of your progress"
          checked={notifications.weeklyReports}
          onChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
        />
      </SettingSection>

      {/* Privacy & Security */}
      <SettingSection
        title="Privacy & Security"
        description="Control how your data is used and stored"
        icon={<Shield className="text-green-600" size={20} />}
      >
        <ToggleSetting
          label="Data Analytics"
          description="Allow anonymous data collection to improve the app"
          checked={privacy.dataAnalytics}
          onChange={(checked) => setPrivacy({ ...privacy, dataAnalytics: checked })}
        />
        <ToggleSetting
          label="Share Anonymous Data"
          description="Help research by sharing anonymized mental health insights"
          checked={privacy.shareAnonymousData}
          onChange={(checked) => setPrivacy({ ...privacy, shareAnonymousData: checked })}
        />
        <ToggleSetting
          label="Local Storage"
          description="Store data locally on your device for offline access"
          checked={privacy.localStorage}
          onChange={(checked) => setPrivacy({ ...privacy, localStorage: checked })}
        />
      </SettingSection>

      {/* Preferences */}
      <SettingSection
        title="Preferences"
        description="Customize the app appearance and behavior"
        icon={<User className="text-purple-600" size={20} />}
      >
        <ToggleSetting
          label="Dark Mode"
          description="Switch to a darker theme for better viewing in low light"
          checked={preferences.darkMode}
          onChange={(checked) => setPreferences({ ...preferences, darkMode: checked })}
        />
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Language</label>
            <p className="text-xs text-gray-500 mt-1">Choose your preferred language</p>
          </div>
          <select
            value={preferences.language}
            onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Timezone</label>
            <p className="text-xs text-gray-500 mt-1">Set your timezone for accurate tracking</p>
          </div>
          <select
            value={preferences.timezone}
            onChange={(e) => setPreferences({ ...preferences, timezone: e.target.value })}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="auto">Auto Detect</option>
            <option value="utc">UTC</option>
            <option value="est">Eastern Time</option>
            <option value="pst">Pacific Time</option>
            <option value="gmt">GMT</option>
          </select>
        </div>
      </SettingSection>

      {/* Data Management */}
      <SettingSection
        title="Data Management"
        description="Export or delete your data"
        icon={<Download className="text-orange-600" size={20} />}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download size={16} />
            <span>Export Data</span>
          </button>
          <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Globe size={16} />
            <span>Sync Settings</span>
          </button>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <button className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 size={16} />
            <span>Delete All Data</span>
          </button>
          <p className="text-xs text-gray-500 mt-2">
            This action cannot be undone. All your journal entries, mood data, and settings will be permanently deleted.
          </p>
        </div>
      </SettingSection>

      {/* App Information */}
      <motion.div variants={itemVariants} className="bg-gray-50 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">App Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Version</span>
            <span className="text-gray-900">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Last Updated</span>
            <span className="text-gray-900">January 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Developer</span>
            <span className="text-gray-900">SATTVA Team</span>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            Made with ♥ for mental wellness
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Settings;