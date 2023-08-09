import React from 'react';

import cartEmptyPng from '../assets/img/empty-cart.png';
import {Link} from "react-router-dom";

const CartEmpty = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>Cart is empty <icon>😕</icon></h2>
        <p>
          Chances are, you probably haven't ordered a pizza yet.<br/>
          To order pizza, go to the home page.
        </p>
        <img src={cartEmptyPng} alt="Empty cart"/>
        <Link to="/" className="button button--black">
          <span>Go back</span>
        </Link>
      </div>
    </>
  );
}

export default CartEmpty;