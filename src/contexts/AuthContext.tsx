// import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// // Define the shape of our authentication context
// interface AuthContextType {
//     isAuthenticated: boolean;
//     user: { username: string } | null;
//     login: (username: string, token: string) => void;
//     logout: () => void;
// }

// // Create the context with default values
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// // Define props for the AuthProvider
// interface AuthProviderProps {
//     children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     // Check local storage for initial auth state
//     const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
//         return localStorage.getItem('token') !== null;
//     });
//     const [user, setUser] = useState<{ username: string } | null>(() => {
//         const storedUsername = localStorage.getItem('username');
//         return storedUsername ? { username: storedUsername } : null;
//     });

//     // Function to handle user login
//     const login = (username: string, token: string) => {
//         localStorage.setItem('token', token);
//         localStorage.setItem('username', username);
//         setIsAuthenticated(true);
//         setUser({ username });
//     };

//     // Function to handle user logout
//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('username');
//         setIsAuthenticated(false);
//         setUser(null);
//     };

//     // Effect to update auth state if localStorage changes (e.g., in another tab)
//     useEffect(() => {
//         const handleStorageChange = () => {
//             const token = localStorage.getItem('token');
//             const storedUsername = localStorage.getItem('username');
//             setIsAuthenticated(token !== null);
//             setUser(storedUsername ? { username: storedUsername } : null);
//         };

//         window.addEventListener('storage', handleStorageChange);
//         return () => window.removeEventListener('storage', handleStorageChange);
//     }, []);

//     return (
//         <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };




import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of our authentication context
interface AuthContextType {
    isAuthenticated: boolean;
    user: { username: string } | null;
    login: (username: string, token: string) => void;
    logout: () => void;
    // NEW: Function for temporary, non-persistent login
    mockLogin: (username: string) => void; 
}

// Create the context with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define props for the AuthProvider
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Check local storage for initial auth state (for persistence)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('token') !== null;
    });
    const [user, setUser] = useState<{ username: string } | null>(() => {
        const storedUsername = localStorage.getItem('username');
        return storedUsername ? { username: storedUsername } : null;
    });

    // Function to handle PERMANENT user login (for future backend use)
    const login = (username: string, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setIsAuthenticated(true);
        setUser({ username });
    };

    // NEW: Function for TEMPORARY login (for current frontend testing)
    const mockLogin = (username: string) => {
        // Only update the component state. localStorage is NOT touched.
        // This means the login status is lost on a full page refresh.
        setIsAuthenticated(true);
        setUser({ username });
    };

    // Function to Handle Logout
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuthenticated(false);
        setUser(null);
    };

    // Effect to update auth state if localStorage changes (e.g., in another tab)
    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem('token');
            const storedUsername = localStorage.getItem('username');
            setIsAuthenticated(token !== null);
            setUser(storedUsername ? { username: storedUsername } : null);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, mockLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};