import React from "react";
import PropTypes from "prop-types";
import { useDeleteUsuarioMutation } from "../../../../../../store/services/hubApi";

const MedicoDeleteModal = ({ closeDeleteModalHandler, medicoId }) => {
  const [deleteMedico] = useDeleteUsuarioMutation();

  const deleteMedicoHandler = async () => {
    await deleteMedico({ usuarioId: medicoId });

    closeDeleteModalHandler();
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <p>Tem certeza ?</p>
      <button
        className="self-center bg-light-blue rounded-sm p-4 text-light-grey"
        type="button"
        onClick={deleteMedicoHandler}
      >
        REMOVER
      </button>
    </div>
  );
};

MedicoDeleteModal.propTypes = {
  closeDeleteModalHandler: PropTypes.func.isRequired,
  medicoId: PropTypes.string.isRequired,
};

export default MedicoDeleteModal;
