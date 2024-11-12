import { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";

const LoginPopup = ({ setShowLogin }) => {
  const [current, setCurrent] = useState("Sign Up");

  return (
    <div className="login-popup">
      <form action="" className="login-container">
        <div className="login-title">
          <h2>{current}</h2>
          <img
            onClick={() => setShowLogin((prev) => !prev)}
            src={assets.cross_icon}
            alt="cross icon"
          />
        </div>
        <div className="login-inputs">
          {current === "Login" ? (<></>) : (<input type="text" placeholder="Your Name" required />)}
          <input type="email" placeholder="Enter Your Email" required />
          <input type="password" placeholder="Enter Your Password" required />
        </div>
        <button type="submit">
          {current === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {current === "Login" ? (<p>Create a new account?{" "}<span className="create" onClick={() => setCurrent("Sign Up")}>Click here</span></p>) : (<p>Already have an account?{" "}<span className="create" onClick={() => setCurrent("Login")}>Login here</span></p>)}
      </form>
    </div>
  );
};

export default LoginPopup;
