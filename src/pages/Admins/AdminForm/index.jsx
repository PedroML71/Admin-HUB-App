import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stepper } from "../../../components";
import StepOne from "./StepOne";

const AdminForm = ({ closeCreateModalHandler }) => {
  const [stepOneData, setStepOneData] = useState({});
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
      labels={["Criar Admin", "Error"]}
      setStepNumber={setStepNumber}
    >
      <StepOne
        closeCreateModalHandler={closeCreateModalHandler}
        errorHandler={errorHandler}
        stepOneData={stepOneData}
      />
      <div className="w-64">
        <p>{errorMessage}</p>
      </div>
    </Stepper>
  );
};

AdminForm.propTypes = {
  closeCreateModalHandler: PropTypes.func.isRequired,
};

export default AdminForm;
