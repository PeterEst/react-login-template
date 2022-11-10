import React from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = React.useContext(AuthContext);

  const logoutUser = () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1>Home</h1>
      <h2>Welcome {user.username}</h2>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Home;
