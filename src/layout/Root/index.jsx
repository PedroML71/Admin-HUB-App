import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import { Header, Sidebar } from "../../components";
import { AuthContext } from "../../context";
import Socket from "../../Socket";

const Root = () => {
  const [sidebarMenu, setSidebarMenu] = useState(false);
  const auth = useContext(AuthContext);

  const toggleSidebarMenu = () => {
    setSidebarMenu((prevState) => !prevState);
  };

  return (
    <>
      {auth?.isLoading ? (
        <div className="relative h-screen">
          <div className="absolute left-2/4 top-2/4 transform -translate-x-2/4 -translate-y-2/4">
            <div className="border-t-transparent w-16 h-16 border-4 border-light-yellow border-solid rounded-full animate-spin" />
          </div>
        </div>
      ) : null}

      {auth?.user && auth?.isLoading === false ? (
        <Sidebar
          sidebarMenu={sidebarMenu}
          toggleSidebarMenu={toggleSidebarMenu}
        />
      ) : null}

      <div
        className={`${
          auth?.user && auth?.isLoading === false
            ? "relative left-20 w-[calc(100%-5rem)]"
            : ""
        }`}
      >
        {auth?.user && auth?.isLoading === false ? <Header /> : null}

        {auth?.isLoading === false ? (
          <main>
            {auth?.user ? (
              <Socket>
                <Outlet />
              </Socket>
            ) : (
              <Outlet />
            )}
          </main>
        ) : null}
      </div>
    </>
  );
};

export default Root;
