import React from "react";
import CategoryList from "../Components/CategoryList";
import BannerProduct from "../Components/BannerProduct";
import HorizontalCardProduct from "../Components/HorizontalCardProduct";
import VerticalCardProduct from "../Components/VerticalCardProduct";

const Home = () => {
  return (
    <div className="px-4">
      <BannerProduct />
      <CategoryList />
      <HorizontalCardProduct category={"watches"} heading={"Popular Watches"} />
      <HorizontalCardProduct category={"airpodes"} heading={"Top Airpodes"} />

      <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
      <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
      <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
      <VerticalCardProduct
        category={"camera"}
        heading={"Camera & Photography"}
      />
      <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
      <VerticalCardProduct
        category={"speakers"}
        heading={"Bluetooth Speakers"}
      />
      <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
      <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
      <VerticalCardProduct category={"processor"} heading={"Processors"} />
      <VerticalCardProduct category={"printers"} heading={"Printers"} />
    </div>
  );
};

export default Home;
