import React, {useState} from "react";

import Header from "./components/Header";

import "./scss/app.scss";
import { Home } from "./Pages/Home";
import {Route, Routes} from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
