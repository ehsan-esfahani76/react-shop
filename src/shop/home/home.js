import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Category from "../category/category";
import ProductItem from "../product/product-item/productItem";
import "./style.scss";
function Home({search , setAdded}) {
  const [data, setData] = useState();
  const [category, setCategory] = useState("All items");
  const [cart , setCart] = useState([])
  const [oldData , setOldData] = useState("")
  async function getData(param) {
    let data;
    if (param === "All items") {
      data = await fetch("https://fakestoreapi.com/products");
    } else {
      data = await fetch(`https://fakestoreapi.com/products/category/${param}`);
    }
    const res = await data.json();
    return res;
  }
  function stateCategory(x) {
    setCategory(x);
  }

  useEffect(()=>{
    if(data && search.length > 0){
      const srch = oldData.filter(item=>{
        return item.title.toLowerCase().match(search) 
      })
      setData(srch)
    }else{
      setData(oldData)
    }
  },[search])

  function cartItemHandler(id , price) {
      const existItem = cart.find(item=>item.id === id)
      if (existItem) {
        const removee = cart.filter(item => item.id !== existItem.id)
        setCart(removee)
      }
      else{
        setCart([...cart,{id:id , order:1 , price:price}])
      }

  }
  useEffect(()=>{
    const local = JSON.parse( localStorage.getItem("cart"))
    if (local && local.length > 0) {
      setCart([...local])
    }
  },[])
  useEffect(()=>{
    localStorage.setItem("cart" , JSON.stringify(cart))
    cart.length > 0 ? setAdded(true) : setAdded(false)
  },[cart])
  useEffect(() => {
    getData(category).then((res) => {setData(res); setOldData(res)});
  }, [category]);

  return (
    <div className="home">
      <Category stateCategory={stateCategory} />
      <div className="home__pr">
        {data ?
          data.map((item) => (
              <ProductItem
                image={item.image}
                title={item.title}
                price={item.price}
                category={item.category}
                rating={item.rating.rate}
                id={item.id}
                key={item.id}
                cartItemHandler={()=>cartItemHandler(item.id , item.price)}
                cartlist={cart}
              />
          )): <h1>Loading ...</h1>}
      </div>
    </div>
  );
}

export default Home;
