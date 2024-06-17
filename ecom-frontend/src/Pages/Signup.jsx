import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import profileImg from "../assest/profile-logo.png";
import ImageToBase64 from "../helpers/ImageToBase64.js";
// import { CgProfile } from "react-icons/cg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    profilePic: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // console.log("data login", data);

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];

    const profileImg = await ImageToBase64(file);

    setData((preve) => {
      return {
        ...preve,
        profilePic: profileImg,
      };
    });

    // console.log("uploadPic", profileImg);
  };

  return (
    <section id="signup">
      <div className="mx-auto container p-4 my-4">
        <div className="bg-white py-5 px-7 w-full max-w-sm mx-auto rounded-lg">
          <div className="h-[6rem] w-[6rem] mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || profileImg} alt="login icons" />
              {/* <CgProfile className="w-[90px] h-[90px] text-indigo-600 z-10" /> */}
            </div>

            <form>
              <label>
                <div className="text-xs w-full bg-opacity-80 bg-indigo-100 pb-2 pt-1 cursor-pointer text-center absolute bottom-0 font-medium">
                  Upload
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>

          <form
            className="pt-4 flex flex-col gap-2 font-medium"
            onSubmit={handleSubmit}
          >
            <div className="grid">
              <label>Name : </label>
              <div className="bg-indigo-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
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
            </div>

            <div>
              <label>Confirm Password : </label>
              <div className="bg-indigo-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter confirm password"
                  value={data.confirmPassword}
                  name="confirmPassword"
                  onChange={handleOnChange}
                  required
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign up
            </button>
          </form>

          <p className="my-5 font-medium">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className=" text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Signup;
