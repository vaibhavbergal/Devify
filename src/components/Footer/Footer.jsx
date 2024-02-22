import React from "react";
import { Brands } from "../index.js";

const Footer = () => {
  const quickShop = ["Men", "Women", "Kids", "Electronics"];

  const information = ["About us", "Privacy", "Terms & conditions"];
  const customerService = ["FAQ's", "Orders and returns", "Personal data"];

  return (
    <>
      <Brands />
      <div className="bg-rose-100">
        <div className="w-[85%] m-auto flex flex-col gap-5  md:flex-row py-5">
          <div className="flex gap-5 flex-[1]">
            <div className="w-full">
              <h3 className="mb-3 text-xl font-normal underline">Quick Shop</h3>
              <ul className="flex flex-col gap-1">
                {quickShop.map((link) => (
                  <li key={link} className="font-light">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <h3 className="mb-3 text-xl font-normal underline">
                Information
              </h3>
              <ul className="flex flex-col gap-1">
                {information.map((link) => (
                  <li key={link} className="font-light">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex gap-5  flex-[1]">
            <div className="w-full">
              <h3 className="mb-3 text-xl font-normal underline">Service</h3>
              <ul className="flex flex-col gap-1">
                {customerService.map((link) => (
                  <li key={link} className="font-light">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <h3 className="mb-3 text-xl font-normal underline">Contact Us</h3>
              <ul className="flex flex-col gap-1">
                <li className="font-light">Phone: +1 12346586</li>
                <li className="font-light">Email: xyz@xyz.com</li>
                <li className="font-light">Address: London, USA</li>
              </ul>
            </div>
          </div>
        </div>
        <p className="py-3 text-sm text-center border-t border-black/30 font-mooli">
          &copy; Copyright | Devify 2024
        </p>
      </div>
    </>
  );
};

export default Footer;
