
import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-healthcare-bg-blue to-white flex flex-col">
      <header className="py-6 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-healthcare-blue flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <span className="font-bold text-xl text-healthcare-blue">HealthVoice</span>
            </div>
            
            <nav className="hidden md:flex gap-6">
              <a href="#" className="text-healthcare-blue hover:text-healthcare-accent">About</a>
              <a href="#" className="text-healthcare-blue hover:text-healthcare-accent">Features</a>
              <a href="#" className="text-healthcare-blue hover:text-healthcare-accent">Support</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col md:flex-row container mx-auto px-4 py-12">
        <div className="md:w-1/2 flex flex-col justify-center mb-8 md:mb-0 md:pr-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-healthcare-blue mb-4">
            Secure Healthcare Access
            <span className="block text-healthcare-teal">With Your Voice</span>
          </h1>
          
          <p className="text-gray-600 mb-6">
            Voice authentication provides a secure, convenient, and hands-free way to access your healthcare portal. 
            Our system uses over 100 unique voice characteristics to verify your identity.
          </p>
          
          <div className="bg-white rounded-lg p-4 shadow-md space-y-3 mb-6">
            <div className="flex items-start">
              <div className="bg-healthcare-blue/10 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-healthcare-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-healthcare-blue">Enhanced Security</h3>
                <p className="text-sm text-gray-600">Biometric authentication adds an advanced layer of protection</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-healthcare-blue/10 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-healthcare-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-healthcare-blue">Touchless Access</h3>
                <p className="text-sm text-gray-600">Perfect for medical environments and accessibility needs</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-healthcare-blue/10 rounded-full p-2 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-healthcare-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-healthcare-blue">Fast Authentication</h3>
                <p className="text-sm text-gray-600">Verify your identity in seconds, not minutes</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/2 flex items-center justify-center">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      </main>

      <footer className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">&copy; 2025 HealthVoice. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-healthcare-blue">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-healthcare-blue">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-healthcare-blue">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
