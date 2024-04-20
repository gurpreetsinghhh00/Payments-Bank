"use client";

import { ReactNode } from "react";
interface ButtonProps {
  children: ReactNode,
  onClick : ()=>void
}

export const Button = ({ children, onClick}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full"
    >
      {children}
    </button>
  );
};
