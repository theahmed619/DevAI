import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import Header from "../components/Header";
import { ChatData } from "../context/ChatContext";
import { CgProfile } from "react-icons/cg";
import { FaRobot } from "react-icons/fa";
import { LoadingBig, LoadingSmall } from "../components/Loading";
import { IoMdSend } from "react-icons/io";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const {
    fetchResponse,
    messages,
    prompt,
    setPrompt,
    newRequestLoading,
    loading,
    chats,
  } = ChatData();

  const submitHandler = (e) => {
    e.preventDefault();
    fetchResponse();
  };

  const messagecontainerRef = useRef();

  useEffect(() => {
    if (messagecontainerRef.current) {
      messagecontainerRef.current.scrollTo({
        top: messagecontainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 flex-col relative z-10">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-4 bg-gray-800/50 backdrop-blur-lg text-2xl hover:bg-gray-700/50 transition-all"
        >
          <GiHamburgerMenu />
        </button>

        <div className="flex-1 p-6 mb-20 md:mb-0">
          <Header />

          {loading ? (
            <LoadingBig />
          ) : (
            <div
              className="flex-1 p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar"
              ref={messagecontainerRef}
            >
              {messages && messages.length > 0 ? (
                messages.map((e, i) => (
                  <div key={i} className="animate-slide-up">
                    {/* User Message */}
                    <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 text-white flex gap-3 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.01]">
                      <div className="bg-white p-2 rounded-full text-blue-600 text-2xl h-10 w-10 flex items-center justify-center shadow-md flex-shrink-0">
                        <CgProfile />
                      </div>
                      <div className="flex-1 flex items-center break-words">{e.question}</div>
                    </div>

                    {/* Bot Message */}
                    <div className="mb-4 p-4 rounded-2xl bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 text-white flex gap-3 shadow-lg hover:shadow-xl transition-all">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-full text-white text-2xl h-10 w-10 flex items-center justify-center shadow-md flex-shrink-0">
                        <FaRobot />
                      </div>
                      <div className="flex-1 break-words">
                        <p dangerouslySetInnerHTML={{ __html: e.answer }}></p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 mt-20">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-xl">No messages yet</p>
                  <p className="text-sm mt-2">Start a conversation below!</p>
                </div>
              )}

              {newRequestLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-2xl p-4 shadow-lg">
                    <LoadingSmall />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {chats && chats.length === 0 ? (
        ""
      ) : (
        <div className="fixed bottom-0 right-0 left-auto p-4 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent w-full md:w-[75%] backdrop-blur-xl z-20">
          <form
            onSubmit={submitHandler}
            className="flex justify-center items-center max-w-4xl mx-auto"
          >
            <input
              className="flex-1 p-4 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 rounded-l-2xl text-white outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all placeholder-gray-400"
              type="text"
              placeholder="Type your message here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="p-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-r-2xl text-2xl text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg"
            >
              <IoMdSend />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
