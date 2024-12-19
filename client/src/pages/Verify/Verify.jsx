import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./Verify.css";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();
  
  const verifyPayment = async () => {
    const response = await axios.post(`${url}/api/orders/verify`,{success, orderId});
    if(response.data.success){
      navigate('/myOrders');
    }
    else{
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [])
  

  return (
    <div className="Verify-div">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
