import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./style.scss";
function Category({stateCategory}) {
  const [active, setActive] = useState(0);
  const [category, setCategory] = useState("All items");
  const list = [
    "All items",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];
  function clickHandler(e,item) {
    setActive(e.target.id);
    setCategory(item);
  }

  useEffect(()=>{
    stateCategory(category)
  },[category])
  return (
    <div className="category">
        {list.map((item, index) => (
          <button
            onClick={(e) => clickHandler(e,item)}
            className={active == index ? "category__active" : ""}
            id={index}
            key={index}
          >
            {item}
          </button>
        ))}
    </div>
  );
}

export default Category;
