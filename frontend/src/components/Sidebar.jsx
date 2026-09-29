import { IoIosCloseCircle } from "react-icons/io";
import { ChatData } from "../context/ChatContext";
import { MdDelete } from "react-icons/md";
import { LoadingSpinner } from "./Loading";
import { UserData } from "../context/UserContext";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { chats, createChat, createLod, setSelected, deleteChat } = ChatData();
  const { logoutHandler } = UserData();

  const deleteChatHandler = (e, id) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this chat?")) {
      deleteChat(id);
    }
  };

  const clickEvent = (id) => {
    setSelected(id);
    toggleSidebar();
  };

  return (
    <div
      className={`fixed inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl border-r border-gray-700/50 p-4 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } z-50`}
    >
      <button
        className="md:hidden p-2 mb-4 bg-gray-700/50 backdrop-blur-lg rounded-xl text-2xl hover:bg-gray-600/50 transition-all"
        onClick={toggleSidebar}
      >
        <IoIosCloseCircle />
      </button>

      <div className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
        💬 DevAI
      </div>

      <div className="mb-4">
        <button
          onClick={createChat}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          disabled={createLod}
        >
          {createLod ? <LoadingSpinner /> : "✨ New Chat"}
        </button>
      </div>

      <div>
        <p className="text-sm text-gray-400 mb-3 font-medium">Recent Chats</p>

        <div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar space-y-2">
          {chats && chats.length > 0 ? (
            chats.map((e, index) => (
              <div
                key={e._id}
                className="w-full text-left py-3 px-4 bg-gray-800/50 backdrop-blur-lg border border-gray-700/50 hover:bg-gray-700/50 hover:border-purple-500/50 rounded-xl flex justify-between items-center gap-2 cursor-pointer transition-all group animate-slide-in"
                onClick={() => clickEvent(e._id)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="flex-1 truncate text-sm">
                  {e.latestMessage.slice(0, 30)}...
                </span>
                <button
                  className="bg-red-500/80 hover:bg-red-600 text-white text-lg px-2.5 py-2 rounded-lg transition-all md:opacity-0 md:group-hover:opacity-100 transform md:scale-90 md:group-hover:scale-100 flex-shrink-0"
                  onClick={(event) => deleteChatHandler(event, e._id)}
                >
                  <MdDelete />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <div className="text-4xl mb-2">📝</div>
              <p className="text-sm">No chats yet</p>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 mb-6 w-[calc(100%-2rem)]">
        <button
          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-4 py-3 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          onClick={logoutHandler}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;