// src/components/Layout.js

import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./index";

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header /> {/* Always displayed at the top */}
      <main className="flex-1 mt-16">
        {" "}
        {/* mt-16 to push content below the fixed header */}
        <Outlet /> {/* Render routed components here */}
      </main>
    </div>
  );
};
