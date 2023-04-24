import React, { useState, useRef, useEffect } from "react";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Modal } from "../../../../../components";
import PacienteForm from "../../../PacienteForm";
import PacienteDeleteModal from "./PacienteDeleteModal";

const PacientesMenu = ({ pacienteId, pacienteData }) => {
  const [pacientesMenu, setPacientesMenu] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const pacientesRef = useRef();

  const closeEditModalHandler = () => {
    setEditModal(false);
  };

  const closeDeleteModalHandler = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!pacientesRef.current.contains(e.target)) {
        setPacientesMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="relative" ref={pacientesRef}>
      <EllipsisHorizontalIcon
        className="w-6 text-dark-blue cursor-pointer"
        onClick={() => setPacientesMenu((prevState) => !prevState)}
      />

      <div
        className={`absolute top-5 right-0 flex flex-col gap-4 bg-white rounded-sm drop-shadow-md p-2 transform -translate-y-5 transition-all duration-200 ease-out ${
          pacientesMenu
            ? "opacity-100 pointer-events-auto visible translate-y-0"
            : "opacity-0 pointer-events-none invisible"
        }`}
      >
        <ul className="flex flex-col gap-2">
          <li
            className="group flex items-center gap-4 p-2 rounded-sm transition-all duration-200 ease-out hover:bg-light-blue cursor-pointer"
            onClick={() => setEditModal(true)}
          >
            <PencilIcon className="w-6 text-dark-blue justify-self-start transition-all duration-200 ease-out group-hover:text-white" />
            <p className="text-dark-blue font-light transition-all duration-200 ease-out group-hover:text-white">
              Editar
            </p>

            <Modal visible={editModal} onClose={closeEditModalHandler}>
              <PacienteForm
                closeEditModalHandler={closeEditModalHandler}
                editMode={true}
                pacienteData={pacienteData}
              />
            </Modal>
          </li>

          <li
            className="group flex items-center gap-4 p-2 rounded-sm transition-all duration-200 ease-out hover:bg-light-blue cursor-pointer"
            onClick={() => setDeleteModal(true)}
          >
            <TrashIcon className="w-6 text-dark-blue justify-self-start transition-all duration-200 ease-out group-hover:text-white" />
            <p className="text-dark-blue font-light transition-all duration-200 ease-out group-hover:text-white">
              Deletar
            </p>

            <Modal visible={deleteModal} onClose={closeDeleteModalHandler}>
              <PacienteDeleteModal
                closeDeleteModalHandler={closeDeleteModalHandler}
                pacienteId={pacienteId}
              />
            </Modal>
          </li>
        </ul>
      </div>
    </div>
  );
};

PacientesMenu.propTypes = {
  pacienteId: PropTypes.string.isRequired,
  pacienteData: PropTypes.object.isRequired,
};

export default PacientesMenu;
