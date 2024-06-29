import React, { useEffect } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden font-medium">
      <aside className="bg-white min-h-full  w-full  max-w-60 customShadow shadow-md">
        <div className="h-32 bg-indigo-600 text-indigo-100 flex justify-center items-center flex-col">
          <div className="cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-16 h-16 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser className="text-5xl" />
            )}
          </div>
          <p className="capitalize text-md font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/***navigation */}
        <div>
          <nav className="grid px-4 py-6">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-indigo-100">
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-indigo-100">
              All Product
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
