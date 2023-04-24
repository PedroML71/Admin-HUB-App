import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stepper } from "../../../components";
import StepOne from "./StepOne";

const MedicoForm = ({
  closeCreateModalHandler,
  closeEditModalHandler,
  editMode,
  medicoData,
}) => {
  const [stepOneData, setStepOneData] = useState(editMode ? medicoData : {});
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
      labels={editMode ? ["Editar Medico", "Error"] : ["Criar Medico", "Error"]}
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

MedicoForm.propTypes = {
  closeCreateModalHandler: PropTypes.func,
  closeEditModalHandler: PropTypes.func,
  editMode: PropTypes.bool,
  medicoData: PropTypes.object,
};

export default MedicoForm;
