import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  const [obj, setObj] = useState({
    name: "",
    description: "",
    price: "",
    imgUrl : "",
  });

  // GET ALL PRODUCTS
  const fetchProducts = async () => {
    const res = await axios.get(
      "http://localhost:5001/api/products"
    );

    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ADD PRODUCT
  const handleSubmit = async () => {
    await axios.post(
      "http://localhost:5001/api/products/post",
      obj
    );

    setObj({
      name: "",
      description: "",
      price: ""
    });

    fetchProducts();
  };

  // DELETE PRODUCT
  const handleDelete = async (id) => {
    await axios.delete(
      `http://localhost:5001/api/products/delete/${id}`
    );

    fetchProducts();
  };

  return (
    <div>
      <h2>Products</h2>

      <p>
        <input
          type="text"
          placeholder="Product Name"
          value={obj.name}
          onChange={(e) =>
            setObj({
              ...obj,
              name: e.target.value
            })
          }
        />
      </p>

      <p>
        <input
          type="text"
          placeholder="Description"
          value={obj.description}
          onChange={(e) =>
            setObj({
              ...obj,
              description: e.target.value
            })
          }
        />
      </p>

      <p>
        <input
          type="number"
          placeholder="Price"
          value={obj.price}
          onChange={(e) =>
            setObj({
              ...obj,
              price: e.target.value
            })
          }
        />
      </p>
      <p>
        <input type="text" onChange={(e)=>setObj({...obj,imgUrl:e.target.value})} placeholder="Image URL"/>
      </p>

      <p>
        <button onClick={handleSubmit}>
          Add Product
        </button>
      </p>

      <hr />

      <h3>All Products</h3>

      <ol>
        {products.map((product) => (
          <li key={product._id}>
          <Link to={`/admin/editProduct/${product._id}`}>
            {product.name}
          </Link>
        
          - {product.price}
          - {product.description}
        
          <img
            src={product.imgUrl}
            alt={product.name}
            width="100"
          />
        
          <button onClick={() => handleDelete(product._id)}>
            Delete
          </button>
        </li>
        ))}
      </ol>
    </div>
  );
}