import { assets } from "../../assets/assets";
import "./Footer.css";

const date = new Date();


const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="logo" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim et
            quis officia dolores, aliquid soluta, autem ut inventore placeat
            nihil repudiandae nisi. Molestiae possimus quod accusantium
            perferendis blanditiis nostrum quae.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="facebook icon" />
            <img src={assets.linkedin_icon} alt="linkedin icon" />
            <img src={assets.twitter_icon} alt="twitter icon" />
          </div>
        </div>
        <div className="footer-content-right">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div className="footer-content-center">
          <h2>Get In Touch</h2>
          <ul>
            <li>+91-6848494978 / +91-9898886889</li>
            <li>ziggysupport@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
        <p className="footer-copyright">
          Copyright {date.getFullYear()} @ ziggy.com - All rights reserved
        </p>
    </div>
  );
};

export default Footer;
