import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";
import authService from "../appwrite/auth";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

const RegisterPage = ({ setProgress }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    setProgress(40);
    setTimeout(() => {
      setProgress(100);
    }, 1000);
  }, []);

  return (
    <div className="flex mt-5 items-center justify-center w-full h-[80vh]">
      <div className="flex w-full max-w-md py-5 shadow-md md:max-w-2xl bg-rose-100 rounded-xl">
        <div className="flex items-center justify-center flex-1">
          <div className="flex flex-col gap-8 ">
            <h3 className="text-4xl font-semibold ">Sign up</h3>

            {error && (
              <p className="text-sm text-center text-red-600 ">{error}</p>
            )}

            <form
              onSubmit={handleSubmit(create)}
              className="flex flex-col gap-6 "
            >
              <div className=" flex items-center space-x-4 border-b-[1px] border-black py-2">
                <FaUserAlt />
                <input
                  type="text"
                  name="first-name"
                  placeholder="First Name"
                  {...register("name", {
                    required: true,
                  })}
                  className="outline-none bg-rose-100"
                />
              </div>
              <div className=" flex items-center space-x-4 border-b-[1px] border-black py-2">
                <FaUserAlt />
                <input
                  type="text"
                  name="last-name"
                  placeholder="Last Name"
                  {...register("name", {
                    required: true,
                  })}
                  className="outline-none bg-rose-100"
                />
              </div>

              <div className=" flex items-center space-x-4 border-b-[1px] border-black py-2">
                <MdEmail />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPatern: (value) =>
                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                          value
                        ) || "Email address must be a valid address",
                    },
                  })}
                  className="outline-none bg-rose-100"
                />
              </div>
              <div className=" flex items-center space-x-4 border-b-[1px] border-black py-2">
                <FaLock />
                <input
                  type="password"
                  name="last-name"
                  placeholder="Password"
                  {...register("password", {
                    required: true,
                  })}
                  className="outline-none bg-rose-100"
                />
              </div>
              <Button
                type="submit"
                className=" bg-[#fd164c] hover:bg-rose-500 w-full text-center py-2 px-4 text-white text-base rounded-md"
              >
                Create Account
              </Button>
            </form>
            <h3 className="text-sm">
              Already Member?
              <Link
                to="/login"
                className="text-blue-700 font-mooli hover:scale-110"
              >
                Login
              </Link>
            </h3>
          </div>
        </div>
        {/* right */}
        <div className="items-center justify-center flex-1 hidden md:flex">
          <div className="flex flex-col items-center justify-between gap-5 w-">
            <p className="font-mooli text-5xl font-semibold text-[#fd164c]">
              {" "}
              Devify Store
            </p>
            <img
              src="https://i.postimg.cc/BZRNJ5tQ/Pngtree-shopping-on-mobile-5354478.png"
              alt=""
              className="w-[280px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
