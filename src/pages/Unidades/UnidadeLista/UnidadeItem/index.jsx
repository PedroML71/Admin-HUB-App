import React, { useState } from "react";
import { HomeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Modal } from "../../../../components";
import UnidadeForm from "../../UnidadeForm";
import UnidadeDeleteModal from "./UnidadeDeleteModal";

const UnidadeItem = ({ data }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const closeEditModalHandler = () => {
    setEditModal(false);
  };

  const closeDeleteModalHandler = () => {
    setDeleteModal(false);
  };

  return (
    <li className="bg-white rounded-sm drop-shadow">
      <div className="flex normal:flex-row small:flex-col phone:flex-col">
        <div className="flex flex-col flex-1 justify-center items-center p-4 truncate normal:border-r small:border-b phone:border-b border-r-primary-grey border-b-primary-grey relative">
          <div className="w-24 relative">
            <HomeIcon className="w-full text-dark-blue " />
            <div className="absolute top-4 right-0 bg-light-yellow w-8 h-8 rounded-full flex justify-center items-center group">
              <MapPinIcon className="w-6 text-dark-blue" />

              <div className="flex flex-col items-center opacity-0 pointer-events-none invisible bg-dark-blue text-white text-xs p-2 rounded-md absolute left-2/4 top-2/4 transition-all duration-200 ease-out transform -translate-x-2/4 -translate-y-2/4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-6">
                <span>{`${data.estado} ${data.cidade} ${data.bairro}`}</span>
                <span>{`N${data.numero} - ${data.cep}`}</span>
              </div>
            </div>
          </div>

          <p className="text-2xl ">{data.nome}</p>
        </div>

        <div className="flex flex-col normal:w-80 small:w-full phone:w-full gap-2 p-4 text-base text-dark-blue truncate">
          <div className="flex gap-2">
            <p className="font-bold">Funcionarios:</p>
            <p className="font-light">{data.funcionariosCount}</p>
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Medicos:</p>
            <p className="font-light">{data.medicosCount}</p>
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Celular:</p>
            <p className="font-light">{data.celular}</p>
          </div>

          <div className="flex gap-2">
            <p className="font-bold">Email:</p>
            <p className="font-light">{data.email}</p>
          </div>

          <div className="flex normal:justify-between small:justify-around phone:justify-around">
            <button
              className="self-center bg-light-blue rounded-sm mt-2 px-4 py-2 text-light-grey"
              onClick={() => setEditModal(true)}
            >
              EDITAR
            </button>

            <button
              className="self-center bg-dark-grey rounded-sm mt-2 px-4 py-2 text-dark-blue"
              onClick={() => setDeleteModal(true)}
            >
              DESATIVAR
            </button>

            <Modal visible={editModal} onClose={closeEditModalHandler}>
              <UnidadeForm
                closeEditModalHandler={closeEditModalHandler}
                editMode={true}
                unidadeData={data}
              />
            </Modal>

            <Modal visible={deleteModal} onClose={closeDeleteModalHandler}>
              <UnidadeDeleteModal
                closeDeleteModalHandler={closeDeleteModalHandler}
                unidadeId={data.id}
              />
            </Modal>
          </div>
        </div>
      </div>
    </li>
  );
};

UnidadeItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default UnidadeItem;
