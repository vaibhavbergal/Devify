import React from "react";
import AllProducts from "../components/AllProducts";
import Hero from "../components/Hero";

function Home({ setProgress }) {
  return (
    <div>
      {/* <Hero /> */}
      <AllProducts setProgress={setProgress} />
    </div>
  );
}

export default Home;
