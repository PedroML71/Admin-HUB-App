import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const AdminItem = ({ data }) => {
  return (
    <li className="bg-white rounded-sm drop-shadow">
      <div className="flex items-center gap-4 p-4 border-b border-b-primary-grey">
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

AdminItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AdminItem;
