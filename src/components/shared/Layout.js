import React from "react";
import { Outlet } from "react-router-dom";
// import PublicNav from "./PublicNav";

function Layout() {

  return (
    <section className="bg-gray-50 light:text-gray-300 dark:bg-black dark:text-gray-300">
      {/* <PublicNav /> */}
      <div className="container mx-auto">
        <Outlet />
      </div>
    </section>
  );
}

export default Layout;
