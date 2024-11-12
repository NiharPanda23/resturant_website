import { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  const handelActiveStatus = (e) => {
    setMenu(e.target.textContent);
  };

  return (
    <div className="navbar">
      <Link to="/">
      
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          className={menu === "Home" ? "active" : ""}
          onClick={handelActiveStatus}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          className={menu === "Menu" ? "active" : ""}
          onClick={handelActiveStatus}
        >
          Menu
        </a>
        <a
          href="#"
          className={menu === "Reviews" ? "active" : ""}
          onClick={handelActiveStatus}
        >
          Reviews
        </a>
        <a
          href="#app-download"
          className={menu === "Mobile App" ? "active" : ""}
          onClick={handelActiveStatus}
        >
          Mobile App
        </a>
        <a
          href="#footer"
          className={menu === "Contact Us" ? "active" : ""}
          onClick={handelActiveStatus}
        >
          Contact Us
        </a>
      </ul>
      <div className="right_bar">
        <img src={assets.search_icon} alt="search icon" />
        <div className="basket-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="basket icon" />
          </Link>
          <div className="dot"></div>
        </div>
        <input
          onClick={() => setShowLogin((prev) => !prev)}
          type="button"
          value="Sign in"
        />
      </div>
    </div>
  );
};

export default Navbar;
