// import React from 'react'
// import { AppContext } from './App'
// import { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'


// export default function Cart() {
//   const {cart, setCart , user}=useContext(AppContext);
//   const Navigate = useNavigate();
//   const orderValue = cart.reduce((sum,value)=>sum+item*quantity,0);

//   const increment=(id)=>{
//     setCart(cart.map((item)=>item._id === id ?{...item,quantity:item.quantity+1}:item,));
//   };
//   //loops through and checks if the ids and same and then the product of that ids quant is decreased and then if o quantity then remove that product
//   const decrement = (id)=>{
//     setCart(cart.map((item)=>item._id===id?{...item,quantity:item.quantity-1}:item,).filter((item)=>item.quantity>0));
//   };

//   const deleteItem =(id)=>{
//     setCart(cart.filter((item)=>item._id!==id));
//   };

//   const placeOrder=()=>{

//   }

//   return (
//     <div>
//       My Cart
//       {cart && cart.map((item)=>(<div key={item._id}>{item.name}--{item.price}--
//         <button onClick={()=>decrement(item._id)}>-</button>--
//         {item.quantity}
//         <button onClick={()=>increment(item._id)}>+</button>--
//         {item.price*item.quantity}--
//         <button onClick={()=>deleteItem(item._id)}>DELETE</button>
//         </div>))}
//         OrderValue: {orderValue}
//         <p>
//           {user?.email?(
//             <button onClick={()=>placeOrder}>placeOrder</button>):
//             (<button onClick={()=>Navigate("/login")}>Login To Order</button>
//           )}
//         </p>
//     </div>

//   )
// }













import React from "react";
import { AppContext } from "./App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const Navigate = useNavigate();
  const url = import.meta.env.VITE_API_URL + "/orders";
  const orderValue = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const increment = (id) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  const decrement = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };
  const deleteItem = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };
  const placeOrder = async () => {
    const order = {
      email: user.email,
      items: cart,
      orderValue: orderValue,
    };
    const res = await axios.post(`${url}/create`, order);
    setCart({});
    Navigate("/order");
  };
  return (
    <div>
      My Cart
      {cart &&
        cart.map((item) => (
          <div key={item._id}>
            {item.name}--{item.price}--
            <button onClick={() => decrement(item._id)}>-</button>
            {item.quantity}
            <button onClick={() => increment(item._id)}>+</button>-
            {item.price * item.quantity}-
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        ))}
      Order Value:{orderValue}
      <p>
        {user?.email ? (
          <button onClick={placeOrder}>Place Order</button>
        ) : (
          <button onClick={() => Navigate("/login")}>Login to Order</button>
        )}
      </p>
    </div>
  );
}