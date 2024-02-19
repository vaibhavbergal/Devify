import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchByCategory } from "../store/slices/filterSlice";
import { STATUSES } from "../store/status";
import { ThreeDots } from "react-loader-spinner";
import ProductCard from "../components/ProductCard";

const Category = ({ setProgress }) => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.filter.products);
  const status = useSelector((state) => state.filter.status);

  useEffect(() => {
    setProgress(40);
    dispatch(fetchByCategory(category));
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, [category, dispatch]);

  if (status === STATUSES.LOADING) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <ThreeDots
          visible={true}
          height="50"
          width="70"
          color="#f97316"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <h2>Something went wrong!</h2>
      </div>
    );
  }

  // if (!products || products.length === 0) {
  //   return <div>No products found.</div>;
  // }
  return (
    <>
      <div className="grid mt-8 md:mt-2 place-items-center">
        <h1 className="mt-2 mb-8 text-3xl font-bold capitalize font-mooli ">
          {category}
        </h1>
        <div className="flex flex-wrap my-2 justify-center gap-4 max-w-[90%] ">
          <ProductCard products={products} />
        </div>
      </div>
    </>
  );
};

export default Category;
