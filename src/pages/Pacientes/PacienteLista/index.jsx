import React from "react";
import PropTypes from "prop-types";
import PacienteItem from "./PacienteItem";

const PacienteLista = ({ lista }) => {
  return (
    <ul className="max-w-7xl mx-auto my-0 px-4 grid normal:grid-cols-3 small:grid-cols-2 phone:grid-cols-1 gap-4">
      {lista?.map((paciente) => (
        <PacienteItem key={paciente.id} data={paciente} />
      ))}
    </ul>
  );
};

PacienteLista.propTypes = {
  lista: PropTypes.arrayOf(PropTypes.object),
};

export default PacienteLista;
