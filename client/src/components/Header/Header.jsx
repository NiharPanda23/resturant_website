import { useState, useEffect } from "react";
import "./Header.css";
import { assets } from "../../assets/assets";
import { title } from "process";

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  const slides = [
    {
      background: `${assets.header_img1}`,
      title: "Order Your Favorite Food Here",
      description:"Craving something delicious? We've got you covered! Discover a wide variety of mouth-watering meals from top local restaurants, all available at your fingertips.",
    },
    {
      background: `${assets.header_img2}`,
      title: "Get Fast Delivery Right Here",
      description:"Experience the convenience of quick delivery with your favorite meals arriving fresh at your doorstep. Whether you're in the mood for comfort food, healthy options, or a sweet treat, our platform ensures you can order anything you desire.",
    },
    {
      background: `${assets.header_img3}`,
      title: "Explore A Variety of Choices",
      description:"From snacks to comfort food, explore countless options tailored to your cravings. Our platform provides a broad selection of dishes that cater to every taste and dietary need.",
    },
    {
      background: `${assets.header_img4}`,
      title: "Satisfy Your Midnight Cravings",
      description:"Late-night hunger pangs? We've got you covered! Indulge in a variety of delicious meals, from cheesy pizzas to warm desserts, delivered fresh to your doorstep."
    },
    {
      background: `${assets.header_img6}`,
      title: "Delight in Every Bite Today",
      description:"Make your mealtime special with our curated selection of dishes made to perfection. From flavorful appetizers to rich main courses and decadent desserts, every bite is crafted to deliver an unforgettable experience."
    },
    {
      background: `${assets.header_img5}`,
      title: "Taste Adventure on Your Plate",
      description:"Embark on a culinary journey with every bite! Explore flavors from around the world with our diverse menu, featuring everything from spicy Asian delights to comforting Italian classics."
    },
    {
      background: `${assets.header_img7}`,
      title: "Your Health, Our Priority Always",
      description:"Looking for healthy and nutritious options? Explore our range of wholesome meals crafted with fresh ingredients and balanced nutrition in mind. From salads and protein-rich dishes to vegetarian delights, enjoy meals that nourish your body while delighting your taste buds."
    },
    {
      background: `${assets.header_img8}`,
      title:"Meals for Every Special Moment",
      description:"Celebrating a special occasion or just spending quality time with loved ones? Our menu offers the perfect mix of flavors to suit every moment. From family feasts to intimate dinners, explore diverse options that add a touch of delight to your cherished memories."

    },
    {
      background: `${assets.header_img9}`,
      title:"Your Comfort Food, Anytime",
      description:"Craving the warmth of your favorite comfort foods? We've got all the classics you love, ready to make your day a little brighter. From hearty soups to cheesy delights, treat yourself to the ultimate comfort delivered quickly and with love."

    },
    {
      background: `${assets.header_img10}`,
      title:"Freshness Delivered to Your Door",
      description:"Experience the crisp and vibrant flavors of freshly prepared meals. From farm-fresh ingredients to chef-crafted recipes, every dish is made with care to bring the perfect balance of taste and quality straight to your table."
    }
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
