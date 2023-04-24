import React, { useState, useRef, useEffect } from "react";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Modal } from "../../../../../components";
import FuncionarioForm from "../../../FuncionarioForm";
import FuncionarioDeleteModal from "./FuncionarioDeleteModal";

const FuncionariosMenu = ({ funcionarioId, funcionarioData }) => {
  const [funcionarioMenu, setFuncionarioMenu] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const funcionarioRef = useRef();

  const closeEditModalHandler = () => {
    setEditModal(false);
  };

  const closeDeleteModalHandler = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!funcionarioRef.current.contains(e.target)) {
        setFuncionarioMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="relative" ref={funcionarioRef}>
      <EllipsisHorizontalIcon
        className="w-6 text-dark-blue cursor-pointer"
        onClick={() => setFuncionarioMenu((prevState) => !prevState)}
      />

      <div
        className={`absolute top-5 right-0 flex flex-col gap-4 bg-white rounded-sm drop-shadow-md p-2 transform -translate-y-5 transition-all duration-200 ease-out ${
          funcionarioMenu
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
              <FuncionarioForm
                closeEditModalHandler={closeEditModalHandler}
                editMode={true}
                funcionarioData={funcionarioData}
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

            <Modal
              visible={deleteModal}
              onClose={closeDeleteModalHandler}
              funcionarioId={funcionarioId}
            >
              <FuncionarioDeleteModal
                closeDeleteModalHandler={closeDeleteModalHandler}
                funcionarioId={funcionarioId}
              />
            </Modal>
          </li>
        </ul>
      </div>
    </div>
  );
};

FuncionariosMenu.propTypes = {
  funcionarioId: PropTypes.string.isRequired,
  funcionarioData: PropTypes.object.isRequired,
};

export default FuncionariosMenu;
