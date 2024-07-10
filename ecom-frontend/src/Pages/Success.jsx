import React from "react";
import SUCCESSIMAGE from "../assest/success.gif";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="bg-indigo-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 mt-20 rounded">
      <img src={SUCCESSIMAGE} width={160} height={160} alt="Success" />
      <p className="text-green-600 font-bold text-xl">
        Payment Done Successfully
      </p>
      <Link
        to={"/order"}
        className="p-2 px-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white"
      >
        See Your Orders
      </Link>
    </div>
  );
};

export default Success;
