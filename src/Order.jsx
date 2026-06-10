import React, { useEffect, useState } from "react";
import { AppContext } from "./App";
import { useContext } from "react";
import axios from "axios";

export default function Order() {
  const { user } = useContext(AppContext);
  const [myOrders, setMyOrders] = useState([]);
  const url = import.meta.env.VITE_API_URL + "/orders";
  const fetchMyOrders = async () => {
    const res = await axios.get(`${url}/getMyOrders/${user.email}`);
    setMyOrders(res.data.orders);
  };
  useEffect(() => {
    fetchMyOrders();
  }, []);
  return (
    <div>
      My Orders
      {myOrders &&
        myOrders.map((order) => (
          <div key={order._id}>
            {order.email}-{order.orderValue}-{order.items.length}-{order.orderStatus}
          </div>
        ))}
    </div>
  );
}