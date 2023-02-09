import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import deleteicon from "../assets/icons8-remove-30.png"
import "./style.scss";
function Cart({setAdded}) {
  const [data, setData] = useState([]);
  const [subTotal, setSubTotal] = useState({ subtotal: 0, taxes: 0, total: 0 });
  const [local, setLocal] = useState([]);
  async function getData(locaL) {
    const responses = await Promise.all(
      locaL.map((item) => {
        return fetch(`https://fakestoreapi.com/products/${item.id}`);
      })
    );

    return Promise.all(
      responses.map((response) => {
        return response.json();
      })
    );
  }
  useEffect(() => {
    const locaL = JSON.parse(localStorage.getItem("cart"));
    getData(locaL)
      .then((res) => setData(res))
      .then(setLocal(locaL));
  }, []);

  function changeHandler(e, id) {
    let indexid;
    const findId = local.find((item, index) => {
      indexid = index;
      return item.id === id;
    });
    findId.order = +e.target.value;
    const otherProducts = local.filter((item) => item.id !== id);
    otherProducts.splice(indexid, 0, findId);
    localStorage.setItem("cart", JSON.stringify(otherProducts));
    setLocal(otherProducts);
  }

  function showOrder(id) {
    if (local.length > 0) {
      const find = local.find((item) => item.id === id);
      return find?.order;
    }
    return;
  }

  function deleteHandler(id) {
    const find = local.filter(item => item.id !== id)
    localStorage.setItem("cart" , JSON.stringify(find))
    getData(find)
      .then((res) => setData(res))
      .then(setLocal(find));
  }
  useEffect(() => {
    if (local.length > 0) {
      let sum = 0;
      local.forEach((item) => {
        sum += item.order * item.price;
      });
      const taxes = sum * 0.1;
      const total = sum + taxes;
      setSubTotal({ subtotal: sum, taxes: taxes, total: total });
    }
    local.length>0 ? setAdded(true) : setAdded(false)
  }, [local]);

  return (
    <div className="cart">
      {data.map((item) => (
        <div className="cart__item" key={item.id}>
            <img src={item.image} alt="" className="cart__item__img1"/>
            <div>
              <h4>{item.title}</h4>
              <p>${item.price}</p>
              <select
                onChange={(e) => changeHandler(e, item.id)}
                defaultValue={showOrder(item.id)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <img src={deleteicon} onClick={()=>deleteHandler(item.id)} alt="" className="cart__item__img2"/>
          </div>
      ))}
      {local.length > 0 ?
      <>
        <div className="cart__total">
        <div className="cart__total__item">
          <h4>Subtotal</h4>
          <p>$ {subTotal.subtotal.toFixed(2)}</p>
        </div>
        <div className="cart__total__item">
          <h4>Taxes</h4>
          <p>$ {subTotal.taxes.toFixed(2)}</p>
        </div>
        <div className="cart__total__item">
          <h4>Total</h4>
          <p>$ {subTotal.total.toFixed(2)}</p>
        </div>
      </div>
      <div className="cart__btn">
        <Link>Proceced</Link>
      </div>
      </> : <h1>Cart is Empty</h1>
      }
    </div>
  );
}

export default Cart;
