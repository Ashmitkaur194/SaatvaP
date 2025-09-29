import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, X, Clock, Filter } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'critical' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionRequired: boolean;
}

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'critical',
      title: 'Concerning Mood Pattern Detected',
      message: 'Your mood scores have been consistently low for the past 5 days. Consider reaching out to a mental health professional or trusted friend.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      actionRequired: true,
    },
    {
      id: '2',
      type: 'warning',
      title: 'Increased Anxiety Levels',
      message: 'Your anxiety levels have been higher than usual this week. Try some breathing exercises or consider scheduling a therapy session.',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: false,
      actionRequired: true,
    },
    {
      id: '3',
      type: 'info',
      title: 'Journal Entry Reminder',
      message: "You haven't written in your journal for 3 days. Journaling can help process emotions and reduce stress.",
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      read: true,
      actionRequired: false,
    },
    {
      id: '4',
      type: 'warning',
      title: 'Sleep Pattern Disruption',
      message: 'Your sleep tracking shows irregular patterns. Poor sleep can significantly impact mental health.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      actionRequired: false,
    },
    {
      id: '5',
      type: 'info',
      title: 'Positive Progress',
      message: 'Great job! Your meditation streak is now 7 days. Consistency in mindfulness practice shows real commitment.',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
      read: true,
      actionRequired: false,
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'critical'>('all');

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, read: true } : alert
    ));
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(alert => ({ ...alert, read: true })));
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'info':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="text-red-600" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-600" size={20} />;
      case 'info':
        return <Clock className="text-blue-600" size={20} />;
      default:
        return <AlertTriangle className="text-gray-600" size={20} />;
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'unread':
        return !alert.read;
      case 'critical':
        return alert.type === 'critical';
      default:
        return true;
    }
  });

  const unreadCount = alerts.filter(alert => !alert.read).length;
  const criticalCount = alerts.filter(alert => alert.type === 'critical').length;

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
          <h2 className="text-2xl font-bold text-gray-900">Mental Health Alerts</h2>
          <p className="text-gray-600">
            Stay informed about important patterns and recommendations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {unreadCount} unread, {criticalCount} critical
          </span>
        </div>
      </motion.div>

      {/* Filter and Actions */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white rounded-xl p-4 shadow-sm space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">All Alerts ({alerts.length})</option>
            <option value="unread">Unread ({unreadCount})</option>
            <option value="critical">Critical ({criticalCount})</option>
          </select>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={16} />
            <span>Mark All Read</span>
          </button>
        </div>
      </motion.div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <motion.div variants={itemVariants} className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No alerts to show</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You're all caught up! No new alerts at this time."
                : `No ${filter} alerts to display.`
              }
            </p>
          </motion.div>
        ) : (
          filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              variants={itemVariants}
              className={`border rounded-xl p-6 ${getAlertColor(alert.type)} ${
                !alert.read ? 'shadow-md' : 'shadow-sm'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className={`font-semibold ${
                      !alert.read ? 'text-gray-900' : 'text-gray-700'
                    }`}>
                      {alert.title}
                      {!alert.read && (
                        <span className="ml-2 w-2 h-2 bg-indigo-600 rounded-full inline-block"></span>
                      )}
                    </h3>
                    <div className="flex space-x-2">
                      {!alert.read && (
                        <button
                          onClick={() => markAsRead(alert.id)}
                          className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white hover:bg-opacity-50"
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => dismissAlert(alert.id)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-white hover:bg-opacity-50"
                        title="Dismiss alert"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3 leading-relaxed">{alert.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {alert.timestamp.toLocaleString()}
                    </span>
                    {alert.actionRequired && (
                      <span className="px-3 py-1 bg-white bg-opacity-70 text-xs font-medium rounded-full">
                        Action Required
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons for Critical Alerts */}
              {alert.type === 'critical' && alert.actionRequired && (
                <div className="mt-4 pt-4 border-t border-white border-opacity-50 flex space-x-3">
                  <button className="px-4 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 text-sm font-medium rounded-lg transition-colors">
                    Find Therapist
                  </button>
                  <button className="px-4 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 text-sm font-medium rounded-lg transition-colors">
                    Crisis Resources
                  </button>
                  <button className="px-4 py-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 text-sm font-medium rounded-lg transition-colors">
                    Schedule Check-in
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Alerts;