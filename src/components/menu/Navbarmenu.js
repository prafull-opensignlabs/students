import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiAlignRight, FiXCircle } from "react-icons/fi";
import logo from "../../images/NXG_logo.png";
import "../../App.css";

const Navbarmenu = () => {
  const [isMenu, setisMenu] = useState(false);
  const [isResponsiveclose, setResponsiveclose] = useState(false);
  const toggleClass = () => {
    setisMenu(isMenu === false ? true : false);
    setResponsiveclose(isResponsiveclose === false ? true : false);
  };
  let boxClass = ["main-menu menu-right menuq1"];
  if (isMenu) {
    boxClass.push("menuq2");
  } else {
    boxClass.push("");
  }

  return (
    <header className="header__middle">
      <div className="container">
        <div className="row">
          {/* Add Logo  */}
          <div className="header__middle__logo">
            <NavLink className="is-active" to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="header__middle__menus">
            <nav className="main-nav ">
              {/* Responsive Menu Button */}
              {isResponsiveclose === true ? 
                <>
                  <span className="menubar__button" style={{ display: "none" }} onClick={toggleClass} ><FiXCircle /> </span>
                </> : <>
                  <span  className="menubar__button"  style={{ display: "none" }}  onClick={toggleClass} ><FiAlignRight />  </span>
                </> }


              <ul className={boxClass.join(" ")}>
                <li className="menu-item">
                   <NavLink  className="is-active" onClick={toggleClass} to={`/`}>Home</NavLink>
                   {/* exact="true" */}
                </li>
                <li className="menu-item ">
                  <NavLink  onClick={toggleClass}  className="is-active" to={`/About`} >About</NavLink>
                </li>
                <li className="menu-item ">  
                  <NavLink onClick={toggleClass} className="is-active" to={`/Contact`}>Contact</NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbarmenu;
