import React, { useState, useRef, useEffect, useContext } from "react";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { logoutUser } from "../../../../firebase/services/firebaseAuth";
import { AuthContext } from "../../../../context";

const UserMenu = () => {
  const [userMenu, setUserMenu] = useState(false);
  const auth = useContext(AuthContext);
  const userMenuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!userMenuRef.current.contains(e.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="relative" ref={userMenuRef}>
      {auth?.user?.imageUrl ? (
        <img
          className="w-12 h-12 rounded-full cursor-pointer"
          src={auth?.user?.imageUrl}
          alt="imagem do usuario"
          onClick={() => setUserMenu((prevState) => !prevState)}
        />
      ) : (
        <UserCircleIcon
          className="w-12 text-dark-blue cursor-pointer"
          onClick={() => setUserMenu((prevState) => !prevState)}
        />
      )}

      <div
        className={`absolute top-20 right-6 flex flex-col gap-4 bg-white rounded-sm drop-shadow p-4 transform -translate-y-5 transition-all duration-200 ease-out ${
          userMenu
            ? "opacity-100 pointer-events-auto visible translate-y-0"
            : "opacity-0 pointer-events-none invisible"
        }`}
      >
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-4" onClick={logoutUser}>
            <ArrowRightOnRectangleIcon className="w-6 text-dark-blue justify-self-start" />
            <p className="text-dark-blue font-light transition-all duration-200 hover:text-light-blue cursor-pointer">
              Logout
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
