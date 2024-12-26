import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const UserContext = createContext(null);
export default function UserProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  function logout() {
    const loggingOut = toast.loading("Logging out...");
    setTimeout(() => {
      localStorage.removeItem("token");
      setToken(null);
      toast.dismiss(loggingOut);
    }, 2000);
  }
  return (
    <UserContext.Provider value={{ token, setToken, logout }}>
      {children}
    </UserContext.Provider>
  );
}
