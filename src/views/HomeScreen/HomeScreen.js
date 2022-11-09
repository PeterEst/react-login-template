import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
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
      <Link to={"/Login"}>Logout</Link>
    </div>
  );
};

export default Home;
