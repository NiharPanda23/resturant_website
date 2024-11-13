import { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useLocation } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const location = useLocation();
  const deliveryCharge = location.state?.deliveryCharge || 0;

  return (
    <form action="" className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>
        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />
        <div className="multi-fields">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>
        <div className="multi-fields">
          <input type="text" placeholder="Pin code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      <div className="place-order-right">
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
              <p>
                ₹{" "}
                {getTotalCartAmount() === 0
                  ? 0
                  : deliveryCharge && getTotalCartAmount() >= 500
                  ? "Free"
                  : deliveryCharge}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹{" "}
                {getTotalCartAmount() === 0
                  ? 0
                  : getTotalCartAmount() + deliveryCharge}
              </b>
            </div>
          </div>
          <button>Proceed To Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
