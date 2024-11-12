import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./FoodItem.css";

const FoodItem = ({ id, name, price, description, image }) => {
  

  const {cartItems, addToCart, removeFromCart} = useContext(StoreContext)

  const handelAddFood = () => {
    addToCart(id);
  };
  const addFood = () => {
    addToCart(id);
  };
  const deleteFood = () => {
    removeFromCart(id);
  };

  return (
    <div className="food" id="food">
      <div className="food-img-container">
        <img className="food-image" src={image} alt="" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={handelAddFood}
            src={assets.add_icon_white}
            alt="add icon white"
          />
        ) : (
          <div className="food-item-counter">
            <img onClick={deleteFood} src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={addFood} src={assets.add_icon_green} alt="" />
          </div>
        )}
      </div>
      <div className="food-info">
        <div className="food-name">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating stars" />
        </div>
        <p className="food-description">{description}</p>
        <p className="food-price">₹ {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
