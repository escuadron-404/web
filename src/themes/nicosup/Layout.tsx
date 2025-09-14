"use client";
import type { FC, ReactNode } from "react";
import "./style.css";

const N98Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="N98-theme-root">{children}</div>; // Changed class name
};

export default N98Layout;
