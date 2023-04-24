import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { AuthContext } from "../../../context";

const Header = () => {
  const auth = useContext(AuthContext);
  const role = auth?.user?.role;

  return (
    <header className="flex items-center justify-between h-20 border-b px-4 border-b-dark-grey">
      <Link to={"/"}>
        <img className="h-12 text-dark-blue" alt="Logo" src="/logo.svg" />
      </Link>

      <div className="flex gap-10">
        <nav className="flex gap-6 items-center text-dark-blue phone:hidden">
          {role === "Admin" ? <Link to={"/admins"}>Admins</Link> : null}
          {role === "Admin" || role === "Funcionario" ? (
            <Link to={"/funcionarios"}>Funcionarios</Link>
          ) : null}
          {role === "Admin" || role === "Funcionario" ? (
            <Link to={"/medicos"}>Medicos</Link>
          ) : null}
          {role === "Admin" ? <Link to={"/unidades"}>Unidades</Link> : null}
          {role === "Medico" ? <Link to={"/pacientes"}>Pacientes</Link> : null}
        </nav>

        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
