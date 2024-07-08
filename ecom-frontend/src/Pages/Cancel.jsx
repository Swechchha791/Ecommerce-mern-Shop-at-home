import React from "react";
import CANCELIMAGE from "../assest/cancel.gif";
import { Link } from "react-router-dom";

const Cancel = () => {
  return (
    <div className="bg-indigo-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 mt-20 rounded">
      <img
        src={CANCELIMAGE}
        width={150}
        height={150}
        className="mix-blend-multiply"
      />
      <p className="text-red-600 font-bold text-xl">Payment Cancelled</p>
      <Link
        to={"/cart"}
        className="p-2 px-3 mt-5 border-2 border-indigo-600 rounded font-semibold text-indigo-600 hover:bg-indigo-600 hover:text-white"
      >
        Go To Cart
      </Link>
    </div>
  );
};

export default Cancel;
