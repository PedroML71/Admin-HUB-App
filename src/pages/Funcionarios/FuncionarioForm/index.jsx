import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stepper } from "../../../components";
import StepOne from "./StepOne";

const FuncionarioForm = ({
  closeCreateModalHandler,
  closeEditModalHandler,
  editMode,
  funcionarioData,
}) => {
  const [stepOneData, setStepOneData] = useState(
    editMode ? funcionarioData : {}
  );
  const [stepNumber, setStepNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const errorHandler = (message, body) => {
    setErrorMessage(message);
    setStepOneData({ ...body });
    setStepNumber((prevState) => prevState + 1);
  };

  return (
    <Stepper
      stepNumber={stepNumber}
      labels={
        editMode
          ? ["Editar Funcionario", "Error"]
          : ["Criar Funcionario", "Error"]
      }
      setStepNumber={setStepNumber}
    >
      <StepOne
        closeCreateModalHandler={closeCreateModalHandler}
        closeEditModalHandler={closeEditModalHandler}
        editMode={editMode}
        errorHandler={errorHandler}
        stepOneData={stepOneData}
      />
      <div className="w-64">
        <p>{errorMessage}</p>
      </div>
    </Stepper>
  );
};

FuncionarioForm.propTypes = {
  closeCreateModalHandler: PropTypes.func,
  closeEditModalHandler: PropTypes.func,
  editMode: PropTypes.bool,
  funcionarioData: PropTypes.object,
};

export default FuncionarioForm;
