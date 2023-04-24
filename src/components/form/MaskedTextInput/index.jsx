import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

const MaskedTextInput = ({ name, control, type, label, mask, error }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <div
          className={`h-14 w-64 border rounded-sm bg-white text-dark-blue border-opacity-25 ${
            error ? "border-red-600" : "border-dark-blue"
          }`}
        >
          <InputMask
            mask={mask}
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
            }}
            placeholder={label}
          >
            {(inputProps) => (
              <input
                {...inputProps}
                className="outline-none w-full h-full rounded-sm bg-transparent text-sm p-2"
                type={type}
                id={name}
              />
            )}
          </InputMask>
        </div>
      )}
    />
  );
};

MaskedTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.object,
  mask: PropTypes.string.isRequired,
};

export default MaskedTextInput;
