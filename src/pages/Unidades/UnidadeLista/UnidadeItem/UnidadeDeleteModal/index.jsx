import React from "react";
import PropTypes from "prop-types";
import { useDeleteUnidadeMutation } from "../../../../../store/services/hubApi";

const UnidadeDeleteModal = ({ closeDeleteModalHandler, unidadeId }) => {
  const [deleteUnidade] = useDeleteUnidadeMutation();

  const deleteUnidadeHandler = async () => {
    await deleteUnidade({ unidadeId: unidadeId });

    closeDeleteModalHandler();
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <p>Tem certeza ?</p>
      <button
        className="self-center bg-light-blue rounded-sm p-4 text-light-grey"
        type="button"
        onClick={deleteUnidadeHandler}
      >
        REMOVER
      </button>
    </div>
  );
};

UnidadeDeleteModal.propTypes = {
  closeDeleteModalHandler: PropTypes.func.isRequired,
  unidadeId: PropTypes.string.isRequired,
};

export default UnidadeDeleteModal;
