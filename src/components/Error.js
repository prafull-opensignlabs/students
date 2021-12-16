import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <h1>404</h1>
      <p>Page is not Found</p>
      <NavLink to="/" >Go Back</NavLink>
    </div>
  );
};

export default Error;
