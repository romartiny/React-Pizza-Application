import React, {useEffect, useRef} from 'react';
import Sort from "../components/Sort.jsx";
import {sortTypes} from "../components/Sort.js";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination/Pagination";
import qs from "qs";
import {useNavigate} from "react-router-dom";

import {useSelector, useDispatch} from "react-redux";
import {selectFilter, setCategoryId, setCurrentPage, setFilters} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzaSlice";

export const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);
  const {items, status} = useSelector(selectPizzaData);
  const sortType = sort.sortProperty;

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number))
  };

  const getPizzas = async () => {

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({
      order,
      sortBy,
      category,
      search,
      currentPage
    }))
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
      {
        status === 'error' ?
          <div>
            <h2>Cart is empty 😕</h2>
            <p>Chances are, you probably haven't ordered a pizza yet. To order pizza, go to the home page. </p>
          </div> : <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      }
      <Pagination value={currentPage} onChangePage={onChangePage}/>
    </div>
  )
}