import "./App.css";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { setUserDetails } from "./store/userSlice";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "./common";
import Context from "./context";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }

    // console.log("User details", dataResponse);
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    // console.log("dataApi", dataApi);

    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    //  className="flex flex-col min-h-screen"
    <div className="flex flex-col min-h-screen">
      <Context.Provider
        value={{ fetchUserDetails, fetchUserAddToCart, cartProductCount }}
      >
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </div>
  );
}

export default App;
