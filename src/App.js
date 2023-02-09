import "./App.scss";
import Navbar from "./shop/navbar/navbar";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import Home from "./shop/home/home";
import ProductDetail from "./shop/product/product-detail/productDetail";
import Cart from "./shop/cart/cart";
import { useState } from "react";
function App() {
  const [search , setSerache] = useState("")
  const [added , setAdded] = useState(false)
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar setSearche={setSerache} added={added}/>
      <Routes>
        <Route path="/" element={<Home search={search} setAdded={setAdded}/>}/>
        <Route path="detail/:id" element={<ProductDetail setAdded={setAdded}/>}/>
        <Route path="cart" element={<Cart setAdded={setAdded}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
