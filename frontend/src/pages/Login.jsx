import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");

  // YOUR ORIGINAL API CALLS - UNCHANGED
  const { loginUser, btnLoading, loginWithGoogle } = UserData();
  const { fetchChats } = ChatData();
  const navigate = useNavigate();

  // YOUR ORIGINAL FUNCTIONS - UNCHANGED
  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate, fetchChats);
  };

  const googleLoginHandler = () => {
    loginWithGoogle(navigate, fetchChats);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-[1.02]">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-2">Sign in to continue your conversation</p>
          </div>

          {/* Google Sign In Button - YOUR ORIGINAL FUNCTION */}
          <div className="mb-6 animate-slide-up">
            <button
              type="button"
              onClick={googleLoginHandler}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-gray-300 hover:shadow-md transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={btnLoading}
            >
              {btnLoading ? (
                <LoadingSpinner />
              ) : (
                <>
                  <FcGoogle size={24} className="group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-medium">Continue with Google</span>
                </>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6 animate-slide-up animation-delay-200">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/80 text-gray-500 font-medium">Or continue with email</span>
            </div>
          </div>

          {/* Email Form - YOUR ORIGINAL FORM */}
          <form onSubmit={submitHandler} className="space-y-5 animate-slide-up animation-delay-400">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              disabled={btnLoading}
            >
              {btnLoading ? <LoadingSpinner /> : "Sign In"}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600 animate-fade-in animation-delay-600">
            By continuing, you agree to our Terms of Service
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default Login;