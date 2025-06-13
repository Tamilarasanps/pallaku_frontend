import React from "react";
import { FiPhone } from "react-icons/fi";

const Header = () => {
  return (
    <div className="h-24 w-full  flex items-center justify-between px-4">
      <h1 className="text-red-300 font-bold text-3xl">Pallaku</h1>
      <div className="flex  items-center gap-2">
        <FiPhone />
        <p className="font-semibold texl-md">9514375473</p>
      </div>
    </div>
  );
};

export default Header;
