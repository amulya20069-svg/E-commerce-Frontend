import {useContext } from 'react';
import "./Header.css"
import { Link } from "react-router-dom";
import {AppContext} from "./App.jsx"
function Header() {
  const {user} = useContext(AppContext);
  return <div className="header">
    <div>MU26A Store</div>
    <div>
      <li><Link to="/">Home</Link></li>
      <li><Link to="cart">Cart</Link></li>
      <li><Link to="order">Order</Link></li>
      {user.role==="admin" && (

        <li><Link to="admin">Admin</Link></li>
      )}
       <li><Link to="login">Login</Link></li>
    </div>
  </div>;
}
export default Header