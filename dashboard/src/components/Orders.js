import React from "react";
import { Link } from "react-router-dom";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const Orders = () => {
  return (
    <div className="orders">
      <div className="no-orders">
        <p>You haven't placed any orders today</p>

        <Link to={"/"} className="btn">
          Get started
        </Link>
      </div>
    </div>
  );
};

export default Orders;