import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Bars3Icon,
  IdentificationIcon,
  WrenchIcon,
  HeartIcon,
  HomeIcon,
  XMarkIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import { AuthContext } from "../../../context";

const Sidebar = ({ sidebarMenu, toggleSidebarMenu }) => {
  const auth = useContext(AuthContext);
  const role = auth?.user?.role;

  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full z-20 bg-dark-blue overflow-y-auto overflow-x-hidden no-scrollbar ${
          sidebarMenu ? "w-64" : "w-20 "
        }`}
      >
        <ul className="flex flex-col items-center h-full">
          <li
            className={`w-full ${sidebarMenu ? "hidden" : ""}`}
            onClick={toggleSidebarMenu}
          >
            <div className="flex items-center h-20 w-full cursor-pointer transition-all duration-200 ease-out hover:bg-light-blue">
              <Bars3Icon className="w-8 min-w-8 mx-6 text-light-grey" />
            </div>
          </li>

          <li
            className={`w-full ${sidebarMenu ? "" : "hidden"}`}
            onClick={toggleSidebarMenu}
          >
            <div className="flex items-center h-20 w-full cursor-pointer transition-all duration-200 ease-out hover:bg-light-blue">
              <XMarkIcon className="w-8 min-w-8 mx-6 text-light-grey" />
            </div>
          </li>

          {role === "Admin" ? (
            <li className="w-full">
              <Link
                to={"/admins"}
                className="flex items-center h-20 w-full cursor-pointer transition-all duration-200 ease-out hover:bg-light-blue"
                onClick={toggleSidebarMenu}
              >
                <IdentificationIcon className="w-8 min-w-8 mx-6 text-light-grey" />
                <span
                  className={`text-light-grey transition-all duration-200 ease-out transform ${
                    sidebarMenu
                      ? "opacity-100 pointer-events-auto visible translate-x-0"
                      : "opacity-0 pointer-events-none invisible -translate-x-52"
                  }`}
                >
                  Admins
                </span>
              </Link>
            </li>
          ) : null}

          {role === "Admin" || role === "Funcionario" ? (
            <li className="w-full">
              <Link
                to={"/funcionarios"}
                className="flex items-center h-20 w-full cursor-pointer transition-all duration-200 ease-out hover:bg-light-blue"
                onClick={toggleSidebarMenu}
              >
                <WrenchIcon className="w-8 min-w-8 mx-6 text-light-grey" />
                <span
                  className={`text-light-grey transition-all duration-200 ease-out transform ${
                    sidebarMenu
                      ? "opacity-100 pointer-events-auto visible translate-x-0"
                      : "opacity-0 pointer-events-none invisible -translate-x-52"
                  }`}
                >
                  Funcionarios
                </span>
              </Link>
            </li>
          ) : null}

          {role === "Admin" || role === "Funcionario" ? (
            <li className="w-full">
              <Link
                to={"/medicos"}
                className="flex items-center h-20 w-full cursor-pointer transition-all duration-200 ease-out hover:bg-light-blue"
                onClick={toggleSidebarMenu}
              >
                <HeartIcon className="w-8 min-w-8 mx-6 text-light-grey" />
                <span
                  className={`text-light-grey transition-all duration-200 ease-out transform ${
                    sidebarMenu
                      ? "opacity-100 pointer-events-auto visible translate-x-0"
                      : "opacity-0 pointer-events-none invisible -translate-x-52"
                  }`}
                >
                  Medicos
                </span>
              </Link>
            </li>
          ) : null}

          {role === "Admin" ? (
            <li className="w-full">
              <Link
                to={"/unidades"}
                className="flex items-center h-20 w-full cursor-pointer transition-all duration-200 ease-out hover:bg-light-blue"
                onClick={toggleSidebarMenu}
              >
                <HomeIcon className="w-8 min-w-8 mx-6 text-light-grey" />
                <span
                  className={`text-light-grey transition-all duration-200 ease-out transform ${
                    sidebarMenu
                      ? "opacity-100 pointer-events-auto visible translate-x-0"
                      : "opacity-0 pointer-events-none invisible -translate-x-52"
                  }`}
                >
                  Unidades
                </span>
              </Link>
            </li>
          ) : null}

          {role === "Medico" ? (
            <li className="w-full">
              <Link
                to={"/pacientes"}
                className="flex items-center h-20 w-full cursor-pointer transition-all duration-200 ease-out hover:bg-light-blue"
                onClick={toggleSidebarMenu}
              >
                <FaceSmileIcon className="w-8 min-w-8 mx-6 text-light-grey" />
                <span
                  className={`text-light-grey transition-all duration-200 ease-out transform ${
                    sidebarMenu
                      ? "opacity-100 pointer-events-auto visible translate-x-0"
                      : "opacity-0 pointer-events-none invisible -translate-x-52"
                  }`}
                >
                  Pacientes
                </span>
              </Link>
            </li>
          ) : null}
        </ul>
      </div>

      <div
        className={`z-10 fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-30 transition-all duration-200 ease-out ${
          sidebarMenu
            ? "opacity-100 pointer-events-auto visible translate-x-0"
            : "opacity-0 pointer-events-none invisible"
        }`}
        onClick={toggleSidebarMenu}
      />
    </>
  );
};

Sidebar.propTypes = {
  sidebarMenu: PropTypes.bool.isRequired,
  toggleSidebarMenu: PropTypes.func.isRequired,
};

export default Sidebar;
