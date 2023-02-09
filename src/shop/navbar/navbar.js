import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/download.png";
import Search from "../assets/search.png";
import "./style.scss";
function Navbar({ setSearche, added }) {
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearche(search);
  }, [search]);

  const { pathname } = useLocation();

  return (
    <div className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="" />
      </div>
      <div className="navbar__search">
        {(!pathname.match("detail") && pathname!== "/cart") && (
          <div className="navbar__input">
            <input
              type="search"
              placeholder="Search ..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <img src={Search} alt="" />
          </div>
        )}

        <div className="navbar__link">
          {added && <span></span>}
          <Link to="cart">Cart</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
