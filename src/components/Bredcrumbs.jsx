import React from "react";
import { Link, useLocation } from "react-router-dom";

const Bredcrumbs = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/").filter((path) => path !== "");
  let bredPath = "";

  return (
    <>
      <div className="mt-4 ml-5 font-mono text-sm text-purple-600 capitalize md:mt-0">
        {path.length > 0 && <Link to="/">Home</Link>}
        {path.map((path, index) => {
          const name = decodeURIComponent(path);
          bredPath += `/${name}`;
          const isLast = index === name.length - 1;

          return isLast ? (
            <span key={name}> / {name}</span>
          ) : (
            <Link to="/" key={name}>
              <span> /</span> {name}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Bredcrumbs;
