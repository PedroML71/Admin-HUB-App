import React from "react";
import PropTypes from "prop-types";

const Stepper = ({
  children,
  stepNumber,
  labels,
  setStepNumber,
  switchMode,
}) => {
  const steps = React.Children.toArray(children);
  const step = steps[stepNumber];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 justify-around">
        {steps.map((form, index) =>
          labels[index] !== "Error" ? (
            <div className="flex flex-col gap-2 items-center" key={index}>
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-dark-blue ${
                  stepNumber > index || switchMode === true
                    ? "bg-primary-yellow cursor-pointer"
                    : "bg-slate-300"
                }`}
                onClick={() =>
                  (stepNumber > index || switchMode === true) &&
                  setStepNumber(index)
                }
              >
                <span>{index + 1}</span>
              </div>

              <p className="text-sm text-dark-blue">{labels[index]}</p>
            </div>
          ) : steps.length - 1 === stepNumber ? (
            <div className="flex flex-col gap-2 items-center" key={index}>
              <div className="w-10 h-10 flex items-center justify-center rounded-full text-dark-blue bg-primary-yellow">
                <span>{index + 1}</span>
              </div>

              <p className="text-sm text-dark-blue">{labels[index]}</p>
            </div>
          ) : null
        )}
      </div>

      {step}
    </div>
  );
};

Stepper.propTypes = {
  children: PropTypes.node.isRequired,
  stepNumber: PropTypes.number.isRequired,
  labels: PropTypes.arrayOf(PropTypes.string).isRequired,
  setStepNumber: PropTypes.func.isRequired,
  switchMode: PropTypes.bool,
};

export default Stepper;
