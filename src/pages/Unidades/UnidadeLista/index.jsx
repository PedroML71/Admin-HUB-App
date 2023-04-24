import React from "react";
import PropTypes from "prop-types";
import UnidadeItem from "./UnidadeItem";

const UnidadeLista = ({ lista }) => {
  return (
    <ul className="max-w-7xl mx-auto my-0 px-4 grid normal:grid-cols-2 small:grid-cols-2 phone:grid-cols-1 gap-4">
      {lista?.map((unidade) => (
        <UnidadeItem key={unidade.id} data={unidade} />
      ))}
    </ul>
  );
};

UnidadeLista.propTypes = {
  lista: PropTypes.arrayOf(PropTypes.object),
};

export default UnidadeLista;
