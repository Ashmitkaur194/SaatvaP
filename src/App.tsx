// import React, { useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { AppProvider, useApp } from './contexts/AppContext';
// import Sidebar from './components/Sidebar';
// import Header from './components/Header';
// import Home from './pages/Home';
// import Journal from './pages/Journal';
// import Chatbot from './pages/Chatbot';
// import Dashboard from './pages/Dashboard';
// import Alerts from './pages/Alerts';
// import Settings from './pages/Settings';


// const AppContent: React.FC = () => {
//   const { activePage, isSidebarOpen } = useApp();

//   const renderPage = () => {
//     switch (activePage) {
//       case 'home':
//         return <Home />;
//       case 'journal':
//         return <Journal />;
//       case 'chatbot':
//         return <Chatbot />;
//       case 'dashboard':
//         return <Dashboard />;
//       case 'alerts':
//         return <Alerts />;
//       case 'settings':
//         return <Settings />;
//       default:
//         return <Home />;
//     }
//   };

//   const pageVariants = {
//     initial: {
//       opacity: 0,
//       x: 20,
//     },
//     in: {
//       opacity: 1,
//       x: 0,
//     },
//     out: {
//       opacity: 0,
//       x: -20,
//     },
//   };

//   const pageTransition = {
//     type: 'tween',
//     ease: 'anticipate',
//     duration: 0.4,
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       <Sidebar />
      
//       {/* Main Content */}
//       <div className={`flex-1 flex flex-col transition-all duration-300 ${
//         isSidebarOpen ? 'md:ml-64' : 'ml-0'
//       }`}>
//         {/* Header Section */}
//         <div className="p-6 pb-0">
//           <Header />
//         </div>

//         {/* Page Content */}
//         <div className="flex-1 p-6">
//           <AnimatePresence mode="wait" initial={false}>
//             <motion.div
//               key={activePage}
//               initial="initial"
//               animate="in"
//               exit="out"
//               variants={pageVariants}
//               transition={pageTransition}
//             >
//               {renderPage()}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// const App: React.FC = () => {
//   useEffect(() => {
//     // Update document title
//     document.title = 'SATTVA - Mental Wellness Companion';
//   }, []);

//   return (
//     <AppProvider>
//       <AppContent />
//     </AppProvider>
//   );
// };

// export default App;


































import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 1. IMPORT AUTH COMPONENTS
import { AuthProvider, useAuth } from './contexts/AuthContext'; // NEW: Auth context
import AuthPage from './pages/AuthPage';


// EXISTING IMPORTS
import { AppProvider, useApp } from './contexts/AppContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Chatbot from './pages/Chatbot';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';

// --- EXISTING AppContent COMPONENT ---
const AppContent: React.FC = () => {
  // Use both AppContext and AuthContext
  const { activePage, isSidebarOpen } = useApp();
  const { isAuthenticated } = useAuth(); // NEW: Get authentication state

  // If the user is NOT authenticated, render nothing here, as we handle
  // the AuthPage rendering in the main App component.
  if (!isAuthenticated) {
    return null; 
  }

  // --- EXISTING LOGIC FOR RENDERING PAGES ---
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'journal':
        return <Journal />;
      case 'chatbot':
        return <Chatbot />;
      case 'dashboard':
        return <Dashboard />;
      case 'alerts':
        return <Alerts />;
      case 'settings':
        return <Settings />;
      default:
        return <Home />;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -20 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4,
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? 'md:ml-64' : 'ml-0'
      }`}>
        {/* Header Section */}
        <div className="p-6 pb-0">
          <Header />
        </div>

        {/* Page Content */}
        <div className="flex-1 p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activePage}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
// --- END AppContent COMPONENT ---


// --- MAIN App COMPONENT (Where the Auth Logic is Added) ---
const App: React.FC = () => {
  useEffect(() => {
    // Update document title
    document.title = 'SATTVA - Mental Wellness Companion';
  }, []);

  return (
    // 1. Add the AuthProvider at the top level
    <AuthProvider> 
      <AppProvider> 
        <AuthGate /> {/* 2. Use a gate to check auth state */}
      </AppProvider>
    </AuthProvider>
  );
};


// --- NEW AuthGate COMPONENT ---
// This component checks the authentication state and renders the appropriate content.
const AuthGate: React.FC = () => {
    // We use useAuth() here because the component is wrapped by AuthProvider in the main App
    const { isAuthenticated } = useAuth(); 

    // Use a motion.div here so the switch between AuthPage and AppContent gets a nice transition
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={isAuthenticated ? 'app' : 'auth'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
            >
                {/* Conditional Rendering: Show AuthPage if NOT logged in, otherwise show the main App */}
                {isAuthenticated ? <AppContent /> : <AuthPage />}
            </motion.div>
        </AnimatePresence>
    );
}

export default App;