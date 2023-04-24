import React from "react";
import PropTypes from "prop-types";
import { useDeleteUsuarioMutation } from "../../../../../../store/services/hubApi";

const FuncionarioDeleteModal = ({ closeDeleteModalHandler, funcionarioId }) => {
  const [deleteFuncionario] = useDeleteUsuarioMutation();

  const deleteFuncionarioHandler = async () => {
    await deleteFuncionario({ usuarioId: funcionarioId });

    closeDeleteModalHandler();
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <p>Tem certeza ?</p>
      <button
        className="self-center bg-light-blue rounded-sm p-4 text-light-grey"
        type="button"
        onClick={deleteFuncionarioHandler}
      >
        REMOVER
      </button>
    </div>
  );
};

FuncionarioDeleteModal.propTypes = {
  closeDeleteModalHandler: PropTypes.func.isRequired,
  funcionarioId: PropTypes.string.isRequired,
};

export default FuncionarioDeleteModal;
