import {useState} from "react";

function Categories({ value, onClickCategory }) {

  const categories = [
    'All',
    'Spicy',
    'Vegan',
    'Grill',
    'Meat',
    'Closed'
  ];

  return (
    <div className="categories">
      <ul>
        {
          categories.map((categoryName, index) => (
            <li onClick={() => onClickCategory(index)}
                className={value === index ? 'active' : ''}
                key={categoryName}>
              {categoryName}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Categories;