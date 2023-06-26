import React, {useEffect, useState} from 'react';
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState(0);

  useEffect(() => {
    fetch('https://64984c6b9543ce0f49e1dc4a.mockapi.io/items?category=' + categoryId)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .then(() => setIsLoading(false))
    window.scrollTo(0, 0);
  }, [categoryId])

  return (
    <div className='conatiner'>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Menu</h2>
      <div className="content__items">
        {
          isLoading ? [...new Array(6)].map((item, index) => <Skeleton key={index}/>)
            : items.map((item) => <PizzaBlock key={item.id} {...item}/>)
        }
      </div>
    </div>
  )
}