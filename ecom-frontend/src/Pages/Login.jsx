import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import profileImg from "../assest/profile-logo.png";
import { toast } from "react-toastify";
import SummaryApi from "../common";
import Context from "../context";
// import { CgProfile } from "react-icons/cg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  // console.log("generalContext", fetchUserDetails);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails(); // fetch the user details
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  // console.log("data login", data);

  return (
    <section id="login">
      <div className="mx-auto container p-4 my-10">
        <div className="bg-white py-5 px-8 w-full max-w-sm mx-auto rounded-lg">
          <div className="h-[6rem] w-[6rem] mx-auto pt-2">
            <img src={profileImg} alt="login icons" />
            {/* <CgProfile className="w-[90px] h-[90px] text-indigo-600" /> */}
          </div>

          <form
            className="pt-4 flex flex-col gap-2 font-medium"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label>Email : </label>
              <div className="bg-indigo-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  className="w-full h-full outline-none bg-transparent"
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className="bg-indigo-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  name="password"
                  className="w-full h-full outline-none bg-transparent"
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-indigo-600"
              >
                Forgot password ?
              </Link>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>

          <p className="my-5 font-medium">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className=" text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
