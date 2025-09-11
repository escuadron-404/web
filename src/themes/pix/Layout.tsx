"use client";
import type { FC, ReactNode } from "react";
import "./style.css";

const PixLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="pix-theme-root">{children}</div>; // Changed class name
};

export default PixLayout;
