import React, {useEffect, useState} from 'react';
import axios from "axios";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";

import {useSelector, useDispatch} from "react-redux";
import {setCategoryId, setCurrentPage} from "../redux/slices/filterSlice";

export const Home = ({searchValue}) => {
  const dispatch = useDispatch();

  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  const sortType = sort.sortProperty;

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  };


  useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    axios.get(`https://64984c6b9543ce0f49e1dc4a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}`)
      .then(res => {
        setItems(res.data);
        setIsLoading(false);
      })
  }, [categoryId, sortType, searchValue, currentPage])

  const skeletons = [...new Array(6)].map((item, index) => <Skeleton key={index}/>);

  const pizzas = items.filter((obj) => obj.title.toLowerCase().includes(searchValue.toLowerCase()))
    .map((item) => <PizzaBlock key={item.id} {...item}/>);

  return (
    <div className='conatiner'>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => onClickCategory(id)}/>
        <Sort/>
      </div>
      <h2 className="content__title">Menu</h2>
      <div className="content__items">
        {
          isLoading
            ? skeletons
            : pizzas
        }
      </div>
      <Pagination value={currentPage} onChangePage={onChangePage}/>
    </div>
  )
}