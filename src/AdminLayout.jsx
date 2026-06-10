import React from 'react'
import Users from './Users'
import { Link, Outlet } from 'react-router-dom'
export default function AdminLayout() {
  return (
    <div>
       <Link to="/admin">Users</Link>-
        <Link to="/admin/products">Products</Link>-
         <Link to="/admin/orders">Orders</Link>
       <hr />
       <Outlet/>
    </div>
  )
}