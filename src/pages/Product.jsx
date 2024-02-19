import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "@/store/slices/singleProductSlice";
import { ImPriceTag } from "react-icons/im";
import { Button } from "@/components/ui/button";
import { addCart } from "@/store/slices/cartSlice";
import { FaCartPlus } from "react-icons/fa";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { toast } from "react-toastify";
import STATUSES from "@/store/status";
import { ThreeDots } from "react-loader-spinner";

const Product = ({ setProgress }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleProduct, status } = useSelector((state) => state.singleProduct);

  useEffect(() => {
    setProgress(40);
    dispatch(fetchSingleProduct(id));
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, [dispatch, id]);

  const cart = useSelector((state) => state.cart);
  const isItemInCart = cart.some((item) => item.id === singleProduct.id);

  const handleAddCart = () => {
    dispatch(addCart(singleProduct));
    toast.success("Added to Cart");
  };

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
      <div className="my-10 md:flex md:justify-center">
        <div className="mx-5 my-6 md:flex md:max-w-6xl md:w-full md:gap-8">
          <div className="grid p-2 border bg-rose-50 border-black/20 place-items-center">
            <img
              src={singleProduct.image}
              alt={singleProduct.title}
              className="object-contain mix-blend-multiply w-96 h-96 md:max-w-xl"
            />
          </div>
          <div className="mt-5 md:mt-0">
            <h1 className="text-xs font-semibold tracking-wide text-orange-700 md:text-sm font-mooli">
              {singleProduct.category}
            </h1>
            <h1 className="my-2 text-xl font-semibold md:text-2xl">
              {singleProduct.title}
            </h1>
            <p className="text-xs md:text-sm text-black/80">
              {singleProduct.description}
            </p>

            <h3 className="mt-3 text-lg font-semibold md:mt-5 font-mooli">
              Price : ₹ {(singleProduct.price * 70).toFixed(2)}
            </h3>

            <h4 className="mt-5 font-semibold "> Available offers:</h4>

            <p className="flex gap-1 my-3 text-xs md:text-sm">
              <ImPriceTag />
              Bank Offer: 5% Cashback on Flipkart Axis Bank Card T&C
            </p>
            <p className="flex gap-1 my-3 text-xs md:text-sm">
              <ImPriceTag />
              Buy this product and get extra ₹500 off T&C
            </p>
            {!isItemInCart ? (
              <Button
                variant="outline"
                className="w-full my-3 text-lg text-white rounded-none md:w-4/6 lg:w-1/2 bg-rose-600 hover:bg-rose-700 hover:text-white "
                onClick={handleAddCart}
              >
                <FaCartPlus className="mr-2" />
                Add to cart
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-full my-3 text-lg text-white rounded-none md:w-4/6 lg:w-1/2 bg-rose-600 hover:bg-rose-700 hover:text-white "
                onClick={() => navigate("/cart")}
              >
                <PiShoppingCartSimpleBold className="mr-2" />
                Go to cart
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
