import React, { useContext } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { AuthContext } from "../../../../context";
import FuncionariosMenu from "./FuncionariosMenu";

const FuncionarioItem = ({ data }) => {
  const auth = useContext(AuthContext);
  const role = auth?.user?.role;

  return (
    <li className="bg-white rounded-sm drop-shadow">
      <div className="flex justify-between items-center p-4 border-b border-b-primary-grey">
        <div className="flex items-center gap-4">
          {data.imageUrl ? (
            <img
              className="w-10 h-10 rounded-full"
              src={data.imageUrl}
              alt="imagem do usuario"
            />
          ) : (
            <UserCircleIcon className="w-10 text-dark-blue" />
          )}

          <p className="text-base text-dark-blue">{`${data.nome} ${data.sobrenome}`}</p>
        </div>

        {role === "Admin" ? (
          <FuncionariosMenu funcionarioId={data.id} funcionarioData={data} />
        ) : null}
      </div>

      <div className="flex flex-col gap-2 p-4 text-base text-dark-blue">
        <div className="flex gap-2">
          <p className="font-bold">Nome:</p>
          <p className="font-light truncate">{data.nome}</p>
        </div>

        <div className="flex gap-2">
          <p className="font-bold">Sobrenome:</p>
          <p className="font-light truncate">{data.sobrenome}</p>
        </div>

        <div className="flex gap-2">
          <p className="font-bold">Celular:</p>
          <p className="font-light truncate">{data.celular}</p>
        </div>

        <div className="flex gap-2">
          <p className="font-bold">Email:</p>
          <p className="font-light truncate">{data.email}</p>
        </div>
      </div>
    </li>
  );
};

FuncionarioItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default FuncionarioItem;
