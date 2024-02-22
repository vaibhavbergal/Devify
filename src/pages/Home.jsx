import React from "react";
import { AllProducts, Hero } from "../components/index";

function Home({ setProgress }) {
  return (
    <div>
      {/* <Hero /> */}
      <AllProducts setProgress={setProgress} />
    </div>
  );
}

export default Home;
