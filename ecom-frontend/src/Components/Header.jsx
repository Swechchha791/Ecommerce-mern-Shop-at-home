import React from "react";
// import { FaBucket } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import ecomLogo from "../assest/ecom-logo.png";

const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className=" h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <img src={ecomLogo} className="w-[90px] h-[40px]" alt="ecom-logo" />
            {/* <FaBucket /> */}
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2 bg-white cursor-pointer">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 bg-indigo-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <Link className="text-2xl relative">
            <span>
              <FaShoppingCart />
            </span>

            <div className="bg-indigo-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
              <p className="text-sm">0</p>
            </div>
          </Link>

          <div className="relative flex justify-center">
            <div className="text-3xl cursor-pointer relative flex justify-center">
              <FaRegCircleUser />
            </div>
          </div>

          <div>
            <Link
              to={"/login"}
              className="px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
