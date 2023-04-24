import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import PacientesMenu from "./PacientesMenu";

const PacienteItem = ({ data }) => {
  return (
    <li className="bg-white rounded-sm drop-shadow">
      <div className="flex justify-between items-center p-4 border-b border-b-primary-grey">
        <div className="flex items-center gap-4">
          <UserCircleIcon className="w-10 text-dark-blue" />

          <p className="text-base text-dark-blue">{`${data.nome} ${data.sobrenome}`}</p>
        </div>

        <PacientesMenu pacienteId={data.id} pacienteData={data} />
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

PacienteItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PacienteItem;
