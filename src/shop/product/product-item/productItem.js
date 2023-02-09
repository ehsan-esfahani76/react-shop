import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
function ProductItem({ image, title, price, category, rating, id,cartItemHandler,cartlist}) {

  const [cart,setCart] = useState([]);
  useEffect(()=>{
    const exist = cartlist.find(item=>item.id===id)
    setCart(exist)
  },[cartlist])


  return (
    <div className="pri">
      <Link to={`detail/${id}`}>
        <div>
          <div className="pri__img">
            <img src={image} alt="" />
          </div>
          <h5>{title}</h5>
          <p>$ {price}</p>
          <p>{category}</p>
        </div>
      </Link>
      <div className="pri__btn">
        <p>{rating}</p>
        {cart === undefined ? 
        <button onClick={cartItemHandler}>Add to cart</button>
        :
        <button onClick={cartItemHandler} className="pri__btn__remove">Remove</button>
        }
      </div>
    </div>
  );
}

export default ProductItem;
