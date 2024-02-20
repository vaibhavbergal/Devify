import React from "react";
import { Link } from "react-router-dom";
import { Card, CardDescription, CardTitle } from "./ui/card";

const ProductCard = ({ products }) => {
  return (
    <>
      {products.map((item) => {
        return (
          <Card
            key={item.id}
            className="w-56 px-2 py-1 shadow-none border-black/20 bg-gray-50"
          >
            <Link to={`/product/${item.id}`} className="flex flex-col">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="object-contain transition-all ease-in-out aspect-square mix-blend-multiply hover:scale-105"
              />
              <CardTitle className="mt-2 text-[10px] font-medium tracking-wide font-mooli capitalize text-orange-700">
                {item.category}
              </CardTitle>
              <CardTitle className="my-1 overflow-hidden text-sm font-medium whitespace-nowrap overflow-ellipsis ">
                {item.title}
              </CardTitle>
              <CardDescription className="font-sans text-black">
                ₹ {(item.price * 83).toFixed(2)}
              </CardDescription>
            </Link>
          </Card>
        );
      })}
    </>
  );
};

export default ProductCard;
