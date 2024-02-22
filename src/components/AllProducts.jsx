import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/store/slices/productSlice";
import STATUSES from "@/store/status";
import { ProductCard } from "./index";
import { ThreeDots } from "react-loader-spinner";

function AllProducts({ setProgress }) {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);

  useEffect(() => {
    setProgress(40);
    dispatch(fetchProducts());
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, []);

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

  return (
    <>
      <div className="grid mt-8 md:mt-2 place-items-center">
        <h1 className="mt-2 mb-8 text-3xl font-bold font-mooli">
          All Products
        </h1>
        <div className="flex flex-wrap my-2 justify-center gap-4 max-w-[90%] ">
          <ProductCard products={products} />
        </div>
      </div>
    </>
  );
}

export default AllProducts;
