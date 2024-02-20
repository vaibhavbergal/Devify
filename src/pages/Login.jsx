import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "@/store/slices/authSlice";
import authService from "@/appwrite/auth";
import { toast } from "react-toastify";

const LoginPage = ({ setProgress }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        toast.success("Logged in Successfully");
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
    <>
      <div className="flex items-center justify-center w-full h-[70vh] md:h-[80vh]">
        <Card className="flex w-full max-w-md py-10 shadow-md md:max-w-2xl bg-rose-100 rounded-xl">
          <div className="items-center justify-center flex-1 hidden md:flex">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-col-reverse">
              <div className="flex flex-col items-center justify-between gap-5 ">
                <p className="mooli text-5xl font-semibold text-[#fd164c]">
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
          {/* right */}
          <div className="flex items-center justify-center flex-1">
            <div className="flex flex-col gap-8 ">
              <h3 className="text-4xl font-semibold ">Sign In</h3>

              <form
                onSubmit={handleSubmit(login)}
                className="flex flex-col gap-6 "
              >
                <div className=" flex items-center space-x-4 border-b-[1px] border-black py-2">
                  <MdEmail />
                  <input
                    placeholder="Email"
                    type="email"
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
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                    })}
                    className="outline-none bg-rose-100"
                  />
                </div>
                {error && <p className="text-xs text-red-600 ">{error}</p>}
                <Button
                  type="submit"
                  className=" bg-[#fd164c] hover:bg-rose-500 w-full text-center py-2 px-4 text-white text-base rounded-md"
                >
                  Login
                </Button>
              </form>
              <h3 className="text-sm">
                New User?
                {!authStatus ? (
                  <Link
                    to="/signup"
                    className="text-blue-700 font-mooli hover:scale-110"
                  >
                    Sign Up
                  </Link>
                ) : null}
              </h3>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
