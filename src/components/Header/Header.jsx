import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { fetchByCategory } from "@/store/slices/filterSlice";
import { Button } from "../ui/button";
import { FiX } from "react-icons/fi";
import { HiMenuAlt1 } from "react-icons/hi";
import LogoutBtn from "../LogoutBtn";
import { RiAccountCircleFill } from "react-icons/ri";

function Header() {
  const cart = useSelector((state) => state.cart);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleCategory = (category) => {
    dispatch(fetchByCategory(category));
    navigate(`/products/${category}`);
  };

  const categories = [
    "men's clothing",
    "women's clothing",
    "jewelery",
    "electronics",
  ];

  return (
    <>
      <div className="flex items-center h-16 gap-3 px-3 text-white bg-black shadow-lg">
        <Button
          onClick={toggleNavbar}
          className="p-0 px-1 text-3xl bg-transparent md:hidden hover:bg-black"
        >
          {!isOpen ? <HiMenuAlt1 /> : <FiX />}
        </Button>
        <div className="flex items-center justify-between w-full md:justify-around">
          <Link to="/" className="text-2xl font-medium ">
            <span className="text-amber-400">Dev</span>ify
          </Link>
          <ul className="flex gap-2 md:gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `py-4 hidden md:block hover:text-blue-500 ${
                  isActive
                    ? "scale-x-110 font-medium text-blue-500"
                    : "text-white"
                }`
              }
            >
              Home
            </NavLink>
            {!authStatus ? (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `pt-3 hover:text-blue-500 ${
                    isActive
                      ? "scale-x-110 font-medium text-blue-500"
                      : "text-white/80"
                  }`
                }
              >
                <RiAccountCircleFill className="text-3xl" />
              </NavLink>
            ) : null}
            {authStatus && (
              <li className="pt-2 text-3xl">
                <LogoutBtn />
              </li>
            )}

            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `py-3 hover:text-blue-500 relative px-1 ${
                  isActive
                    ? "scale-x-110 font-medium text-amber-300"
                    : "text-white"
                }`
              }
            >
              <PiShoppingCartSimpleBold className="text-3xl " />
              <span
                className={`absolute text-white top-1 right-1 px-[6px] py-[2px] text-[10px] ${
                  cart.length > 0 ? "bg-orange-500" : ""
                } rounded-full`}
              >
                {cart.length > 0 ? cart.length : ""}
              </span>
            </NavLink>
          </ul>
        </div>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden border-t border-b shadow-inner transition-all ease-in-out border-white/20 py-3 mb-3  bg-black/90`}
      >
        <ul className="text-center text-white capitalize font-mooli">
          {categories.map((category) => (
            <li
              key={category}
              className="py-2 cursor-pointer hover:text-amber-400"
              onClick={() => handleCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <ul className="justify-end hidden gap-2 py-3 text-lg capitalize md:flex font-mooli">
        {categories.map((category) => (
          <li
            key={category}
            className="px-3 font-semibold border-r-2 cursor-pointer border-black/50 text-rose-500 last:border-none hover:text-amber-400"
            onClick={() => handleCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </>
  );
}
export default Header;
