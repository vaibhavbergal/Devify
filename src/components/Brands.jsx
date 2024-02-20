import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

function Brands() {
  // const brands = [
  //   "https://logodix.com/logo/64306.jpg",
  //   "https://logodix.com/logo/513291.gif",
  //   "https://logodix.com/logo/35640.jpg",
  //   "https://logodix.com/logo/722421.gif",
  //   "https://logodix.com/logo/21115.png",
  // ];

  return (
    <>
      {/* <div className="w-[85%] m-auto mt-14">
        <h1 className="text-3xl font-bold text-center font-mooli">
          THE MOST LOVED BRANDS
        </h1>
        <div className="flex flex-wrap justify-around gap-5 my-5">
          {brands.map((brand, index) => (
            <img
              src={brand}
              alt="Brand's Logo"
              className="object-contain w-32 aspect-square mix-blend-multiply"
              key={index}
            />
          ))}
        </div>
      </div> */}

      <div className="py-6 mt-5 bg-green-400 md:mt-10">
        <div className="w-[85%] m-auto  flex flex-col items-center md:justify-center gap-5 md:flex-row">
          <h3>
            Sign up for <span className="text-lg font-bold">newsletter</span>
          </h3>
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Enter your email"
              className="w-full px-2 py-2 rounded-s-lg"
            />
            <button className="px-3 text-white bg-red-600 rounded-e-lg">
              SUBSCRIBE
            </button>
          </div>
          <div className="flex gap-3 text-xl ">
            <FaFacebookF className="cursor-pointer" />
            <FaXTwitter className="cursor-pointer" />
            <FaYoutube className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
            <FaPinterest className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Brands;
