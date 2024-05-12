import React from "react";
import { Link } from "react-router-dom";
import Images from "../../Images/modern-stationary-collection-arrangement_23-2149309643.jpg";
// import "./App.css";

const Home = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <div>
        <Link to="login" className="link">
          Sign In
        </Link>
        <Link to="register" className="link">
          Sign Up
        </Link>
      </div>
    </div>
    // <div className="demo-wrap">
    //   <div className="demo-content">

    //   </div>
    // </div>
  );
};

export default Home;
