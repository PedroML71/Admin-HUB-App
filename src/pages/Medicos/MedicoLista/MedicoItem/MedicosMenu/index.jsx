import React, { useState, useRef, useEffect } from "react";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { Modal } from "../../../../../components";
import MedicoForm from "../../../MedicoForm";
import MedicoDeleteModal from "./MedicoDeleteModal";

const MedicosMenu = ({ medicoId, medicoData }) => {
  const [medicosMenu, setMedicosMenu] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const medicosRef = useRef();

  const closeEditModalHandler = () => {
    setEditModal(false);
  };

  const closeDeleteModalHandler = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!medicosRef.current.contains(e.target)) {
        setMedicosMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="relative" ref={medicosRef}>
      <EllipsisHorizontalIcon
        className="w-6 text-dark-blue cursor-pointer"
        onClick={() => setMedicosMenu((prevState) => !prevState)}
      />

      <div
        className={`absolute top-5 right-0 flex flex-col gap-4 bg-white rounded-sm drop-shadow-md p-2 transform -translate-y-5 transition-all duration-200 ease-out ${
          medicosMenu
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
              <MedicoForm
                closeEditModalHandler={closeEditModalHandler}
                editMode={true}
                medicoData={medicoData}
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
              <MedicoDeleteModal
                closeDeleteModalHandler={closeDeleteModalHandler}
                medicoId={medicoId}
              />
            </Modal>
          </li>
        </ul>
      </div>
    </div>
  );
};

MedicosMenu.propTypes = {
  medicoId: PropTypes.string.isRequired,
  medicoData: PropTypes.object.isRequired,
};

export default MedicosMenu;
