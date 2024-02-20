import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCart } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { MdOutlineArrowBack } from "react-icons/md";
import { toast } from "react-toastify";
import authService from "@/appwrite/auth";
import { login, logout } from "@/store/slices/authSlice";
import { ThreeDots } from "react-loader-spinner";

function Cart({ setProgress }) {
  const [quantities, setQuantities] = useState({});
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setProgress(40);
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
          toast.warning("Login to Your Account");
        }
      })
      .finally(() => setLoading(false));

    setProgress(100);
  }, []);

  const price = cart.reduce((acc, a) => {
    return acc + a.price * (quantities[a.id] || 1);
  }, 0);

  const discount = (price * 0.12).toFixed(2);

  const totalAmount = (price - discount).toFixed(2);

  const onQuantityChange = (e, itemId) => {
    const newQuantity = parseInt(e.target.value, 10);

    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQuantities({ ...quantities, [itemId]: newQuantity });
    } else {
      setQuantities({ ...quantities, [itemId]: 1 });
    }
  };

  return !loading ? (
    cart.length > 0 ? (
      <div className="flex flex-col justify-center gap-5 m-3 mt-10 md:flex-row">
        <div className="flex flex-col flex-wrap items-center gap-4 ">
          {cart.map((cart) => (
            <Card
              key={cart.id}
              className="flex flex-col items-center p-2 md:flex-row"
            >
              <img
                src={cart.image}
                alt={cart.title}
                className="object-contain p-1 mt-1 mix-blend-multiply w-36 h-36"
              />
              <div className="flex flex-col items-center">
                <CardTitle className="mt-5 text-base font-normal leading-5 text-center md:w-80 w-72">
                  {cart.title}
                </CardTitle>
                <CardDescription className="mt-3 font-sans font-medium text-black">
                  ₹{(cart.price * 83 * (quantities[cart.id] || 1)).toFixed(2)}
                </CardDescription>
                <div className="flex items-center justify-around w-full">
                  <CardDescription className="flex gap-2 mt-5 text-black ">
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-base font-bold rounded-full"
                      onClick={() =>
                        setQuantities({
                          ...quantities,
                          [cart.id]: (quantities[cart.id] || 1) - 1 || 1,
                        })
                      }
                    >
                      -
                    </Button>
                    <Input
                      type="text"
                      placeholder="1"
                      value={quantities[cart.id] || 1}
                      onChange={(e) => onQuantityChange(e, cart.id)}
                      className="w-8 h-8 p-0 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-base font-bold rounded-full"
                      onClick={() =>
                        setQuantities({
                          ...quantities,
                          [cart.id]: (quantities[cart.id] || 1) + 1,
                        })
                      }
                    >
                      +
                    </Button>
                  </CardDescription>
                  <Button
                    variant="destructive"
                    className="px-2 py-1 mt-5 text-base font-mooli md:mt-5"
                    onClick={() => {
                      dispatch(removeCart(cart.id));
                      toast.error("Removed from cart");
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Card className="w-full  max-w-sm p-3 md:w-[30vw] h-fit">
            <h1 className="my-1 text-lg font-semibold text-gray-500 font-mooli">
              Price Details:
            </h1>
            <hr />
            <div className="mt-3 font-normal text-black/80">
              <p className="flex justify-between ">
                Price ({cart.length} items) :{" "}
                <span> ₹ {(price * 83).toFixed(2)}</span>
              </p>
              <p className="flex justify-between mt-2 ">
                discount(12%) :
                <span className="text-amber-500">
                  - ₹ {(discount * 83).toFixed(2)}
                </span>
              </p>
              <hr className="my-2" />
              <p className="flex justify-between font-semibold">
                Total Amount : <span>₹ {(totalAmount * 83).toFixed(2)}</span>
              </p>
            </div>
            <Button
              variant="destructive"
              className="w-full mt-3 text-lg font-mooli"
            >
              Place Order
            </Button>
          </Card>
        </div>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center m-16 text-center h-72 font-mooli bg-rose-100">
        <h1 className="text-xl font-bold">Your Cart is Empty</h1>
        <Link
          to="/"
          className="flex items-center mt-3 underline underline-offset-2 hover:scale-105 text-amber-500"
        >
          <MdOutlineArrowBack className="w-5 h-5 mr-1 text-black " />
          Shop Now
        </Link>
      </div>
    )
  ) : (
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

export default Cart;
