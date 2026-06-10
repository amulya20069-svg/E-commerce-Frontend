import React, { useEffect, useState } from "react";
import axios from "axios";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const url = import.meta.env.VITE_API_URL + "/orders";
  const fetchOrders = async () => {
    const res = await axios.get(`${url}/get`);
    setOrders(res.data.orders);
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  const delivered = async (orderId) => {
    const res = await axios.patch(`${url}/update/${orderId}`);
    fetchOrders();
  };
  return (
    <div>
      Orders
      <ol>
        {orders &&
          orders.map((order) => (
            <li key={order._id}>
              {order._id}-{order.email}-{order.orderValue}-{order.orderStatus}-
              <button onClick={() => delivered(order._id)}>Delivered</button>
            </li>
          ))}
      </ol>
      <hr />
    </div>
  );
}