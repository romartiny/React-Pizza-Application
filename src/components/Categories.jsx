import {useState} from "react";

function Categories() {
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = [
    'All',
    'Spicy',
    'Vegan',
    'Grill',
    'Meat',
    'Closed'
  ];



  const onClickCategory = (activeIndex) => {
    setActiveIndex(activeIndex);
  };

  return (
    <div className="categories">
      <ul>
        {
          categories.map((category, index) => (
            <li onClick={() => onClickCategory(index)} className={activeIndex === index ? 'active' : ''}>
              {category}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Categories;