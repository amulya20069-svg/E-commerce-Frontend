import React from 'react';
import { AppContext } from "./App";

import {useContext, useEffect, useState } from 'react';
import axios from "axios";
import "./Home.css"

export default function Home() {
  const { user, cart, setCart} = useContext(AppContext);
  const [products, setProducts]=useState([])
  const url = (import.meta.env.VITE_API_URL + "/products");

  const fetchProducts= async()=>{
    const res = await axios.get(url);
    setProducts(res.data.products);
  }

const addToCart=(product)=>{
  
  const found = cart.find((item)=>item._id === product._id);
  if(!found){
    setCart([...cart,{...product , quantity:1}])
    console.log(cart)
  }
};

  useEffect(()=>{fetchProducts();},[])
  return (
    <div className="flex justify-center flexwrap">
        {products && products.map(product=>(
        <div className='m-5 border border-red-900 border-2 hover:bg-gray-100' key={product._id}>
          <img src={product.imgUrl} className='p-3'/>
          <h3 className='box '>{product.name}</h3>
          <p>{product.description}</p>
          <h4 className='text-2xl font-bold '>₹{product.price}</h4>
          <p>
            <button className=' bg-gray-500 text-white-900 w-full m-0 p-1 font-bold hover:bg-red-200' onClick={()=>addToCart(product)}>Add to Cart</button>
          </p>
        </div>
      ))}
    </div>
  );
}
