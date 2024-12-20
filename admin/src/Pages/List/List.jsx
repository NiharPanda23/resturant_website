import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./List.css";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const allFood = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data) {
        setList(response.data);
        // console.log(response.data);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.delete(`${url}/api/food/remove`, {
        data: { id: foodId },
      });
      if (response.data.success === true) {
        setList((prev) => prev.filter((food) => food._id !== foodId));
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    allFood();
  }, []);

  return (
    <div className="list add flex-col">
      <p>Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((food) => {
          return (
            <div key={food._id} className="list-table-format">
              <img
                src={`${url}/images/` + food.image}
                alt={food.name}
              />
              <p>{food.name}</p>
              <p>{food.category}</p>
              <p>{food.price}</p>
              <div className="action">
                <Link to="/add" className="link-reset">
                  <img className="add-img" src={assets.Add} alt="Add" />
                </Link>
                <Link to="/update" className="link-reset">
                  <img
                    src={assets.update}
                    alt="update"
                    className="action-img"
                  />
                </Link>
                <img
                  onClick={() => removeFood(food._id)}
                  src={assets.deleteButton}
                  alt="deleteButton"
                  className="action-img"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
