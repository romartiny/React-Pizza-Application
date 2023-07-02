import React, {useEffect, useState} from 'react';
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";

export const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'popularity',
    sortProperty: 'rating'
  });
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    fetch(`https://64984c6b9543ce0f49e1dc4a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .then(() => setIsLoading(false))
    // window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage])

  const skeletons = [...new Array(6)].map((item, index) => <Skeleton key={index}/>);

  const pizzas = items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock key={item.id} {...item}/>);

  return (
    <div className='conatiner'>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onClickSort={(id) => setSortType(id)} />
      </div>
      <h2 className="content__title">Menu</h2>
      <div className="content__items">
        {
          isLoading
            ? skeletons
            : pizzas
        }
      </div>
      <Pagination onChangePage={number => setCurrentPage(number)}/>
    </div>
  )
}