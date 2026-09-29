import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "../main";
import { signInWithPopup } from "firebase/auth"; // <-- ADD firebase imports
import { auth, provider } from "../firebase";

const UserContext = createContext();

const formatErrorMessage = (error, defaultMessage = "Something went wrong. Please try again.") => {
  const rawMsg = error.response?.data?.message || error.message || "";
  if (!rawMsg) return defaultMessage;

  const lower = rawMsg.toLowerCase();
  if (
    lower.includes("535") ||
    lower.includes("badcredentials") ||
    lower.includes("username and password not accepted") ||
    lower.includes("gsmtp") ||
    lower.includes("econnrefused") ||
    lower.includes("querysrv") ||
    lower.includes("mongo") ||
    lower.includes("network error")
  ) {
    return "Service temporarily unavailable. Please try again later.";
  }

  return rawMsg;
};

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);

  async function loginUser(email, navigate, fetchChats) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, { email });

      toast.success(data.message);
      localStorage.removeItem("verifyToken");
      localStorage.setItem("token", data.token);
      setIsAuth(true);
      setUser(data.user);
      if (fetchChats) fetchChats();
      navigate("/");
    } catch (error) {
      toast.error(formatErrorMessage(error, "Failed to sign in. Please try again."));
    } finally {
      setBtnLoading(false);
    }
  }

  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  async function verifyUser(otp, navigate, fetchChats) {
    const verifyToken = localStorage.getItem("verifyToken");

    if (!verifyToken) return toast.error("Verification session expired. Please sign in again.");
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        verifyToken,
      });

      toast.success(data.message);
      localStorage.removeItem("verifyToken");
      localStorage.setItem("token", data.token);
      navigate("/");
      setIsAuth(true);
      setUser(data.user);
      fetchChats();
    } catch (error) {
      toast.error(formatErrorMessage(error, "Invalid or expired OTP. Please try again."));
    } finally {
      setBtnLoading(false);
    }
  }

  async function loginWithGoogle(navigate, fetchChats) {
    setBtnLoading(true);
    try {
      // 1. Trigger Firebase Google Popup
      const result = await signInWithPopup(auth, provider);

      // 2. Get user info FROM THE CLIENT-SIDE
      const email = result.user.email;
      const name = result.user.displayName;

      // 3. Send this data to your backend
      const { data } = await axios.post(`${server}/api/user/auth-google`, {
        email,
        name,
      });

      // 4. Save your app's token (from your backend)
      toast.success(data.message);
      localStorage.removeItem("verifyToken");
      localStorage.setItem("token", data.token);
      navigate("/");
      setIsAuth(true);
      setUser(data.user);
      fetchChats();
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        setBtnLoading(false);
        return;
      }
      toast.error(formatErrorMessage(error, "Google login failed. Please try again."));
    } finally {
      setBtnLoading(false);
    }
  }

  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setIsAuth(true);
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
      setLoading(false);
    }
  }

  const logoutHandler = (navigate) => {
    localStorage.clear();

    toast.success("logged out");
    setIsAuth(false);
    setUser([]);
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UserContext.Provider
      value={{
        loginUser,
        btnLoading,
        isAuth,
        setIsAuth,
        user,
        verifyUser,
        loading,
        logoutHandler,
        loginWithGoogle,
      }}
    >
      {children}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#1e1e2f",
            color: "#fff",
            borderRadius: "12px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            padding: "12px 18px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)",
            fontSize: "14px",
            maxWidth: "420px",
          },
          success: {
            duration: 3500,
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#fff",
            },
          },
        }}
      />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
