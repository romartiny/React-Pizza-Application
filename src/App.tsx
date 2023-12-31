import React from "react";

import {Home} from "./Pages/Home";
import {Route, Routes} from "react-router-dom";
import NotFound from "./Pages/NotFound";
import Cart from "./Pages/Cart";

import "./scss/app.scss";
import FullPizza from "./Pages/FullPizza";
import MainLayout from "./components/layouts/MainLayout";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="pizza/:id" element={<FullPizza/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Route>
        </Routes>
    );
}

export default App;
