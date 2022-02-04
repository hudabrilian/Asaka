import React, { useState } from "react";
import { Link } from "react-router-dom";

export const PluginLink = ({
  name,
  link,
  active = false,
  onClick,
}: {
  name: string;
  link: string;
  active: boolean;
  onClick: Function;
}) => {
  const [toggle, setToggle] = useState(active);

  const activeClass = "transform translate-x-6";

  return (
    <div
      className={
        "px-5 py-3 rounded-xl flex bg-stone-700 justify-between " +
        (toggle ? "" : "cursor-not-allowed")
      }
    >
      <Link
        to={toggle ? link : ""}
        className={toggle ? "" : "cursor-not-allowed"}
      >
        {name}
      </Link>
      <div
        className={
          "md:w-14 md:h-7 w-12 h-6 flex items-center rounded-full p-1 cursor-pointer " +
          (!toggle ? "bg-gray-300" : "bg-green-300")
        }
        onClick={() => {
          setToggle(!toggle);
          onClick();
        }}
      >
        <div
          className={
            "bg-white md:w-6 md:h-6 h-5 w-5 rounded-full shadow-md transform transition-all ease-in-out " +
            (!toggle ? null : activeClass)
          }
        ></div>
      </div>
    </div>
  );
};
