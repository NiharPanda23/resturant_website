import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

import "./Cart.css";
import { assets } from "../../assets/assets";

const deliveryCharge = Math.floor(Math.random(10) * 100)

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((food, i) => {
          if (cartItems[food._id] > 0) {
            return (
              <div key={i}>
                <div className="cart-items-title cart-items-item">
                  <img src={food.image} alt="food image" />
                  <p>{food.name}</p>
                  <p>₹ {food.price}</p>
                  <p>{cartItems[food._id]}</p>
                  <p>₹ {food.price * cartItems[food._id]}</p>
                  <img
                    onClick={() => removeFromCart(food._id)}
                    className="delete_image"
                    src={assets.delete_icon}
                    alt=""
                  />
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹ {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {getTotalCartAmount()=== 0 ? 0 :  deliveryCharge}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹ {getTotalCartAmount()=== 0 ? 0 : getTotalCartAmount()+50}</b>
            </div>
          </div>
          <button>Proceed To Checkout</button>
        </div>
        <div className="promocode">
          <div>
            <p>If u have a promo code, Enter it here</p>
            <div className="cart_promocode-input">
              <input type="text" placeholder="Coupon code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
