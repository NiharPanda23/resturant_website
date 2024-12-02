import { useState, useEffect } from "react";
import "./Header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const slides = [
    {
      background: `${assets.header_img1}`,
      title: "Order Your Favorite Food Here",
      description:
        "Craving something delicious? We've got you covered! Discover a wide variety of mouth-watering meals from top local restaurants, all available at your fingertips.",
    },
    {
      background: `${assets.header_img2}`,
      title: "Get Fast Delivery Right Here",
      description:
        "Experience the convenience of quick delivery with your favorite meals arriving fresh at your doorstep. Order now and savor the taste of happiness!",
    },
    {
      background: `${assets.header_img3}`,
      title: "Explore A Variety of Choices",
      description:
        "From snacks to comfort food, explore countless options tailored to your cravings. Your next meal is just a click away!",
    },
  ];

  useEffect(() => {
    slides.forEach((slide) => {
      const img = new Image();
      img.src = slide.background;
    });
  }, []);


  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      setCurrentSlide(currentIndex);
      setLoading(false); 
    }, 5000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(${slides[currentSlide].background})`,
        opacity: loading ? 0 : 1, 
        transition: "opacity 0.5s ease",
      }}
    >
      <div className="header-content">
        <h2>{slides[currentSlide].title}</h2>
        <p>{slides[currentSlide].description}</p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
