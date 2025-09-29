import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Define the shape of the form state
interface AuthFormState {
    username: string;
    email: string; // Adding email as it's common for signup
    password: string;
    confirmPassword: string;
}

const AuthPage: React.FC = () => {
    // State to toggle between Login (true) and Signup (false) views
    const [isLogin, setIsLogin] = useState(true);
    const { login: authLogin } = useAuth();
    const { mockLogin } = useAuth(); 

    // State to hold form data
    const [formData, setFormData] = useState<AuthFormState>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    
    // State for displaying errors or success messages
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Handler for all input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setMessage(''); // Clear message on new input
    };

    // Handler for form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // 1. Basic Client-Side Validation
        if (!formData.username || !formData.password) {
            setMessage('Username and password are required.');
            setIsError(true);
            return;
        }

        if (!isLogin) { // Validation for Signup mode
            if (!formData.email) {
                 setMessage('Email is required for sign up.');
                 setIsError(true);
                 return;
            }
            if (formData.password !== formData.confirmPassword) {
                setMessage('Passwords do not match.');
                setIsError(true);
                return;
            }
        }
        
        // 2. SIMULATE API CALL (No real API call happens here)
        
        // In a real application, you would put the fetch() call here,
        // sending formData to your backend's /login or /signup endpoint.
        
        if (isLogin) {
            // Success simulation for Login
            setIsError(false);
            setMessage(`[Frontend Only] Login successful for user: ${formData.username}! (Ready for backend integration)`);

            authLogin(formData.username, 'MOCK_FRONTEND_TOKEN'); 
            mockLogin(formData.username); 
            
            // In a real app: Save token and redirect
            // console.log("Simulated Login Data:", { username: formData.username, password: formData.password });
        } else {
            // Success simulation for Signup
            setIsError(false);
            setMessage('Signup successful! Please proceed to Log In. (Ready for backend integration)');
            
            // Automatically switch to the Login view after a successful simulated signup
            setTimeout(() => {
                setIsLogin(true);
                setMessage('');
                setFormData({ username: formData.username, email: '', password: '', confirmPassword: '' });
            }, 2000);
        }
    };

    // Function to handle switching between login and signup forms
    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setMessage('');
        setIsError(false);
        // Clear all form data when switching views for a clean start
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-200">
                <h2 className="text-4xl font-extrabold text-center mb-2 text-indigo-700">
                    {isLogin ? 'Welcome Back' : 'Get Started'}
                </h2>
                <p className="text-center text-gray-500 mb-8">
                    {isLogin ? 'Login to SAATVA' : 'Create your SAATVA account'}
                </p>

                {/* Message Display (Error/Success) */}
                {message && (
                    <div className={`p-3 mb-4 rounded-lg text-sm ${isError ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-green-100 text-green-700 border border-green-400'}`} role="alert">
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Username Field (Always present) */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email Field (Only for Signup) */}
                    {!isLogin && (
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}
                    
                    {/* Password Field (Always present) */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    
                    {/* Confirm Password Field (Only for Signup) */}
                    {!isLogin && (
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                    >
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={toggleAuthMode}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition duration-150"
                    >
                        {isLogin 
                            ? "Don't have an account? Create One" 
                            : "Already have an account? Log In Instead"
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;