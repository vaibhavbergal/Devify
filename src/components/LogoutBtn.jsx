import React from "react";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { logout } from "../store/slices/authSlice";
import { MdLogout } from "react-icons/md";

function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="px-6 py-2 duration-200 rounded-full inline-bock hover:bg-black hover:text-blue-500"
      onClick={logoutHandler}
    >
      <MdLogout />
    </button>
  );
}

export default LogoutBtn;
