import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const savedUser = localStorage.getItem("user");
  const [user, setUser] = useState(savedUser ? JSON.parse(savedUser) : null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      setEmail("");
    }
  }, [user]);

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Logs in a user by setting the user state with the provided user data.
 *
 * @param {Object} userData - The user data to be set in the state.
 */

/******  7b116406-31bf-435a-b51a-4ad500f42221  *******/
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn, email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
