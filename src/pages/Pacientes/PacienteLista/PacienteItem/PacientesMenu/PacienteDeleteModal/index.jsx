import React from "react";
import PropTypes from "prop-types";
import { useDeletePacienteMutation } from "../../../../../../store/services/hubApi";

const PacienteDeleteModal = ({ closeDeleteModalHandler, pacienteId }) => {
  const [deletePaciente] = useDeletePacienteMutation();

  const deletePacienteHandler = async () => {
    await deletePaciente({ pacienteId: pacienteId });

    closeDeleteModalHandler();
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <p>Tem certeza ?</p>
      <button
        className="self-center bg-light-blue rounded-sm p-4 text-light-grey"
        type="button"
        onClick={deletePacienteHandler}
      >
        REMOVER
      </button>
    </div>
  );
};

PacienteDeleteModal.propTypes = {
  closeDeleteModalHandler: PropTypes.func.isRequired,
  pacienteId: PropTypes.string.isRequired,
};

export default PacienteDeleteModal;
