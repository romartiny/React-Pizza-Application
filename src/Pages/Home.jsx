import React, {useEffect, useState} from 'react';
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://64984c6b9543ce0f49e1dc4a.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => setItems(data))
      .then(() => setIsLoading(false))
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='conatiner'>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          isLoading ? [...new Array(6)].map((item, index) => <Skeleton key={index}/>)
            : items.map((item) => <PizzaBlock key={item.id} {...item}/>)
        }
      </div>
    </div>
  )
}