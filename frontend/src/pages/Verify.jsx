import React, { useState } from "react";
import { UserData } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { ChatData } from "../context/ChatContext";

const Verify = () => {
  const [otp, setOtp] = useState("");
  const { verifyUser, btnLoading } = UserData();
  const { fetchChats } = ChatData();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    verifyUser(Number(otp), navigate, fetchChats);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative w-full max-w-md">
        <form
          className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 transform transition-all duration-500 hover:scale-[1.02]"
          onSubmit={submitHandler}
        >
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Verify Your Account
            </h2>
            <p className="text-gray-600 mt-2">Enter the OTP sent to your email</p>
          </div>

          <div className="mb-6 animate-slide-up animation-delay-200">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="otp">
              One-Time Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
              </div>
              <input
                type="number"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 bg-white/50 backdrop-blur-sm text-gray-900"
                placeholder="Enter 6-digit OTP"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 px-4 rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none animate-slide-up animation-delay-400"
            disabled={btnLoading}
          >
            {btnLoading ? <LoadingSpinner /> : "Verify"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-600 animate-fade-in animation-delay-600">
            Didn't receive the code? Check your spam folder
          </p>
        </form>
      </div>
    </div>
  );
};

export default Verify;
