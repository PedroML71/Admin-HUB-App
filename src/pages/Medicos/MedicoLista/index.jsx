import React from "react";
import PropTypes from "prop-types";
import MedicoItem from "./MedicoItem";

const MedicoLista = ({ lista }) => {
  return (
    <ul className="max-w-7xl mx-auto my-0 px-4 grid normal:grid-cols-3 small:grid-cols-2 phone:grid-cols-1 gap-4">
      {lista?.map((medico) => (
        <MedicoItem key={medico.id} data={medico} />
      ))}
    </ul>
  );
};

MedicoLista.propTypes = {
  lista: PropTypes.arrayOf(PropTypes.object),
};

export default MedicoLista;
