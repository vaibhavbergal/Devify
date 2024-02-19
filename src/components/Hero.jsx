import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <div className="flex items-center justify-center my-5 h-[60vh] bg-gradient-to-br to-purple-300 from-rose-700">
      <div className="tracking-wider text-center capitalize font-mooli">
        <h1 className="text-5xl font-bold leading-normal md:leading-loose ">
          Devify best selling
        </h1>
        <h3 className="font-medium">
          Unique products by world's top designers
        </h3>

        <Button variant="destructive" className="mt-5 ">
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default Hero;
