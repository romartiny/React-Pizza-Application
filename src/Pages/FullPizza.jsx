import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const {id} = useParams();
  const navitate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get('https://64984c6b9543ce0f49e1dc4a.mockapi.io/items/' + id);
        setPizza(data);
      } catch (e) {
        console.log(e);
        navitate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) return 'Loading...';

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt='pizza'/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
}

export default FullPizza;