import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import Sort from "../components/Sort.jsx";
import {sortTypes} from "../components/Sort.js";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";
import qs from "qs";
import {useNavigate} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import {setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import search from "../components/SearchBlock/Search";
import {setItems, fetchPizzas} from "../redux/slices/pizzaSlice";

export const Home = ({searchValue}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  const items = useSelector(state => state.pizza.items);
  const sortType = sort.sortProperty;

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  };

  const getPizzas = async () => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      dispatch(fetchPizzas({
        sortBy,
        order,
        currentPage,
        category,
        search,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortTypes.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({
        ...params,
        sort,
      }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, currentPage, searchValue]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, searchValue]);


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