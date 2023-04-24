import React, { useState } from "react";
import PropTypes from "prop-types";
import { Stepper } from "../../../components";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

const UserForm = ({ closeEditModalHandler }) => {
  const [stepOneData, setStepOneData] = useState({});
  const [stepNumber, setStepNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const errorHandler = (message, body) => {
    setErrorMessage(message);
    setStepNumber(2);

    if (body) {
      setStepOneData({ ...body });
    }
  };

  return (
    <Stepper
      stepNumber={stepNumber}
      labels={["Editar Profile", "Editar Avatar", "Error"]}
      setStepNumber={setStepNumber}
      switchMode={true}
    >
      <StepOne
        closeEditModalHandler={closeEditModalHandler}
        stepOneData={stepOneData}
        errorHandler={errorHandler}
      />
      <StepTwo
        closeEditModalHandler={closeEditModalHandler}
        errorHandler={errorHandler}
      />
      <div className="w-64">
        <p>{errorMessage}</p>
      </div>
    </Stepper>
  );
};

UserForm.propTypes = {
  closeEditModalHandler: PropTypes.func.isRequired,
};

export default UserForm;
