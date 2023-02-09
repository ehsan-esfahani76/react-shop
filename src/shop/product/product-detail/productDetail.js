import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";
function ProductDetail({ setAdded }) {
  const params = useParams();
  const [data, setData] = useState([]);
  const [cartId, setCartId] = useState();
  const [Local, setLocal] = useState([]);
  const [change, setChange] = useState(false);
  async function getData(param) {
    let data;
    data = await fetch(`https://fakestoreapi.com/products/${param}`);
    const res = await data.json();
    return res;
  }
  useEffect(() => {
    getData(params.id).then((res) => setData(res));
  }, [params]);
  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("cart"));
    setLocal(local);
    if (local.length) {
      const findid = local.find((item) => item.id === +params.id);
      setCartId(findid);
    }
    local.length && setAdded(true);
  }, []);

  function clickHandler() {
    const find = Local.find((item) => item.id === +params.id);
    if (find) {
      setCartId(undefined);
      const newcart = Local.filter((item) => item.id !== +params.id);
      setLocal(newcart);
      localStorage.setItem("cart", JSON.stringify(newcart));
    } else {
      setCartId(+params.id);
      setLocal([...Local, { id: +params.id, order: 1, price: data.price }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([
          ...Local,
          { id: +params.id, order: 1, price: data.price },
        ])
      );
    }
  }

  useEffect(()=>{
    Local.length ? setAdded(true) : setAdded(false);
  },[Local])
  return (
    <>
      {data && (
        <div className="prd">
          <div className="prd__img">
            <img src={data.image} alt="" />
          </div>
          <div className="prd__details">
            <h3> {data.title}</h3>
            <p>$ {data.price}</p>
            <p>{data.category}</p>
            <p>{data.description}</p>
            {cartId === undefined ? (
              <button onClick={clickHandler}>Add to cart</button>
            ) : (
              <button onClick={clickHandler} className="prd__details__remove">
                Remove
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
