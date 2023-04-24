import React from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const TextInput = ({ name, control, label, type, error }) => {
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
          <input
            className="outline-none w-full h-full rounded-sm bg-transparent text-sm p-2"
            type={type}
            id={name}
            value={value}
            placeholder={label}
            onChange={(newValue) => {
              onChange(newValue);
            }}
          />
        </div>
      )}
    />
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.object,
};

export default TextInput;
