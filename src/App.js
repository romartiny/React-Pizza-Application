import React, {useEffect, useState} from "react";
import "./scss/app.scss";

import Header from "./components/Header";
import Categories from "./components/Categories";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";
import Skeleton from "./components/PizzaBlock/Skeleton";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://64984c6b9543ce0f49e1dc4a.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .then(() => setIsLoading(false))
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
              isLoading ? [...new Array(6)].map((item) => <Skeleton key={item}/>)
                : items.map((item) => <PizzaBlock key={item.id} {...item}/>)
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
