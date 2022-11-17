import React, { useEffect } from "react";
import axios from "axios";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const checkUser = () => {
    axios
      .post("http://localhost:3300/", {}, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
          console.log("User is authenticated Successfully!");
        } else {
          console.log("User is not authenticated!");
          setUser(null);
        }
      })
      .catch((err) => {
        console.log(
          "An error occured while checking user authentication! :",
          err
        );
        setUser(null);
      });
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3300/logout", {}, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setUser(null);
          console.log("User is logged out Successfully!");
        } else {
          console.log("User is not logged out!");
        }
      })
      .catch((err) => {
        console.log("An error occured while logging out user! :", err);
      });
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkUser, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
