import { useState, useContext } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [current, setCurrent] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password || (current === "Sign Up" && !data.name)) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const endpoint = current === "Sign Up" ? "signup" : "login";
      const response = await axios.post(`${url}/api/user/${endpoint}`, data);

      console.log(response.data); 

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{current}</h2>
          <img
            onClick={() => setShowLogin((prev) => !prev)}
            src={assets.cross_icon}
            alt="cross icon"
          />
        </div>
        <div className="login-inputs">
          {current === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Enter Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Enter Your Password"
            required
          />
        </div>
        <button type="submit">
          {current === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {current === "Login" ? (
          <p>
            Create a new account?{" "}
            <span className="create" onClick={() => setCurrent("Sign Up")}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span className="create" onClick={() => setCurrent("Login")}>
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
