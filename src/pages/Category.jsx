import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Product from "../components/Product";

const Category = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [poster, setPoster] = useState('');

  useEffect(() => {
    getData();
  }, [category]);

  function getData() {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      });
  }
  return (
    <div>
      <div className="max-w-[1500px] mx-auto relative">
        <div className="flex absolute top-0 -z-10 h-60 sm:h-auto object-cover w-full overflow-hidden">
          <img src={poster} alt="" />
        </div>
        <div
          className='md:top-64 grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 p-2 md:p-5 md:pb-40 pb-20 gap-2 md:gap-5'
        >
          {data.map((item) => {
            return (
              <Product
                key={item.id}
                id={item.id}
                rating={item.rating.rate}
                title={item.title}
                price={Math.round(item.price) * 80}
                image={item.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Category;
