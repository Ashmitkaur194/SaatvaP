import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your wellness companion. I'm here to listen, provide support, and help you navigate your mental health journey. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const responses = [
      "I understand what you're going through. It takes courage to express your feelings. Can you tell me more about what's on your mind?",
      "That sounds challenging. Remember that it's okay to feel this way. What do you think might help you feel a little better right now?",
      "Thank you for sharing that with me. Your feelings are valid. Have you considered trying some breathing exercises or mindfulness practices?",
      "I hear you. Sometimes talking about our experiences can be really helpful. What's been the most difficult part for you lately?",
      "It's wonderful that you're taking time to reflect on your mental health. What are some things that usually bring you comfort or joy?",
      "I'm here to support you. Remember that seeking help is a sign of strength, not weakness. What small step could you take today to care for yourself?",
    ];

    // Simple keyword-based responses (in a real app, this would be AI-powered)
    if (userMessage.toLowerCase().includes('anxious') || userMessage.toLowerCase().includes('anxiety')) {
      return "Anxiety can be overwhelming. Try the 4-7-8 breathing technique: breathe in for 4, hold for 7, exhale for 8. This can help calm your nervous system.";
    }
    
    if (userMessage.toLowerCase().includes('sad') || userMessage.toLowerCase().includes('depressed')) {
      return "I'm sorry you're feeling this way. Your feelings are valid. Sometimes sadness is our mind's way of processing difficult experiences. What's one small thing that brought you even a moment of peace recently?";
    }

    if (userMessage.toLowerCase().includes('stressed') || userMessage.toLowerCase().includes('stress')) {
      return "Stress can feel overwhelming, but you're taking a positive step by acknowledging it. Consider breaking down your concerns into smaller, manageable pieces. What's the most pressing thing on your mind right now?";
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
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
      className="flex flex-col h-[calc(100vh-12rem)]"
    >
      {/* Header */}
      <div className="bg-white rounded-t-2xl p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
            <Bot className="text-white" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Wellness Assistant</h3>
            <p className="text-sm text-gray-500">Here to listen and support you</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              message.sender === 'user'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-900 shadow-sm'
            }`}>
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
              }`}>
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-white px-4 py-3 rounded-2xl shadow-sm flex items-center space-x-2">
              <Loader2 className="animate-spin text-gray-400" size={16} />
              <span className="text-sm text-gray-500">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white rounded-b-2xl p-4 border-t border-gray-200">
        <div className="flex items-end space-x-3">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            rows={1}
            className="flex-1 resize-none border border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            style={{ minHeight: '44px', maxHeight: '120px' }}
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim() || isTyping}
            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </motion.div>
  );
};

export default Chatbot;