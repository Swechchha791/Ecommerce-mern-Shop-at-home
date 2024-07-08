import React, { useContext, useEffect, useState } from "react";
// import { FaBucket } from "react-icons/fa6";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ecomLogo from "../assest/ecom-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import SummaryApi from "../common/index";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const context = useContext(Context);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  // console.log("context", context);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    context?.fetchUserAddToCart();
  }, []);

  // Function to search the elements
  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    // Navigate to search page with query parameter if value exists
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      // Navigate to home page if search field is empty or contains only whitespace
      navigate("/");
    }
  };

  // console.log("user-header", user);
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
            value={search}
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-8 bg-indigo-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center text-indigo-600"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full border-2 border-indigo-600"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded font-medium">
                <nav>
                  {/* <Link
                    to={"/user-profile"}
                    className="whitespace-nowrap hidden md:block hover:bg-indigo-100 px-2 py-0.5"
                    onClick={() => setMenuDisplay(false)}
                  >
                    User Profile
                  </Link> */}

                  <Link
                    to={"/order"}
                    className="whitespace-nowrap block hover:bg-indigo-100 px-2 py-0.5"
                    onClick={() => setMenuDisplay(false)}
                  >
                    Your Orders
                  </Link>

                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-indigo-100 px-2 py-0.5"
                      onClick={() => setMenuDisplay((preve) => !preve)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              {/* Add to cart bucket */}
              <div className="bg-indigo-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3 font-medium">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-110 transition-all"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 hover:scale-110 transition-all"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
