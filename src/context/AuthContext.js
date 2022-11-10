import React, { useEffect } from "react";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const checkUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  const handleLogin = async (username, password) => {
    setUser({ username, password });
    localStorage.setItem("user", JSON.stringify({ username, password }));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
