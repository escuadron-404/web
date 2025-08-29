"use client";
import type { FC, ReactNode } from "react";
import "./style.css"; // Import Kayron's specific styles

const KayronLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="kayron-theme-root">{children}</div>;
};

export default KayronLayout;
