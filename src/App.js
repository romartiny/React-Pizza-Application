import React, {useEffect, useState} from "react";
import "./scss/app.scss";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";

function App() {
  const [items, setItems] = useState([]);
  //https://64984c6b9543ce0f49e1dc4a.mockapi.io/items

  useEffect(() => {
    fetch('https://64984c6b9543ce0f49e1dc4a.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            {/*<Categories />*/}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              items.map((pizza) => (
                <PizzaBlock {...pizza} key={pizza.id}/>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
