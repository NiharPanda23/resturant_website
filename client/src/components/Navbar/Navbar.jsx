import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

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
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin((prev) => !prev)}>Sign Up</button>
        ) : (
          <div className="navbar-profile">
            <img
              className="profile"
              src={assets.profile_icon}
              alt="profile icon"
            />
            <ul className="nav-profile-dropdown">
              <li>
                <img src={assets.profile_edit} alt="profile_edit" />
                <p>Profile</p>
              </li>
              <hr />
              <li>
                <img src={assets.bag_icon} alt="bag icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li>
                <img src={assets.favorite_logo} alt="" />
                <p>Favorites</p>
              </li>
              <hr />
              <li>
                <img src={assets.membership} alt="" />
                <p>Membership</p>
              </li>
              <hr />
              <li>
                <img src={assets.profile_dark_icon} alt="profile_dark_icon" />
                <p>Theme</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout icon" />
                <p>Log Out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
