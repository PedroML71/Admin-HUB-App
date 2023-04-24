import React from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Loading } from "../../../components";
import { useGetUsuarioSignupHistoryQuery } from "../../../store/services/hubApi";

const MedicoGraph = ({ unidadeId, role }) => {
  const { data: response, isLoading } = useGetUsuarioSignupHistoryQuery(
    role === "Admin"
      ? { params: { role: "Medico" } }
      : { params: { role: "Medico" }, unidadeId: unidadeId }
  );

  return (
    <li className="bg-white rounded-sm drop-shadow">
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4 p-4 border-b border-b-primary-grey">
            <HeartIcon className="w-16 text-dark-blue" />

            <p className="text-2xl text-dark-blue">Medicos</p>
          </div>

          <div className="flex flex-col gap-2 p-4 text-base text-dark-blue">
            <div className="self-center flex gap-2 text-2xl">
              <p className="font-bold">{response?.data?.total}</p>
              <p className="font-light">Cadastrados</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold">{response?.data?.umDia}</p>
              <p className="font-light truncate">Cadastrados hoje</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold">{response?.data?.trintaDias}</p>
              <p className="font-light truncate">Cadastrados a 30 dias</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold">{response?.data?.sessentaDias}</p>
              <p className="font-light truncate">Cadastrados a 60 dias</p>
            </div>

            <div className="flex gap-2">
              <p className="font-bold">{response?.data?.umAno}</p>
              <p className="font-light truncate">Cadastrados a 1 ano</p>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

MedicoGraph.propTypes = {
  unidadeId: PropTypes.string,
  role: PropTypes.string.isRequired,
};

export default MedicoGraph;
