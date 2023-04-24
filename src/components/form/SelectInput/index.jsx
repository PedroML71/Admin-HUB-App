import React, { useState } from "react";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const SelectInput = ({ name, control, label, error, children }) => {
  const [active, setActive] = useState(
    control._defaultValues[name] !== "" ? true : false
  );

  const handleActivation = (e) => {
    setActive(!!e.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={control._defaultValues[name] === "" && ""}
      render={({ field: { onChange, value } }) => (
        <div
          className={`relative h-14 w-64 border rounded-sm bg-white text-dark-blue border-opacity-25 ${
            error ? "border-red-600" : "border-dark-blue"
          }`}
        >
          <select
            className="outline-none w-full h-full rounded-sm bg-transparent text-sm p-2"
            value={value}
            onChange={(newValue) => {
              handleActivation(newValue);
              onChange(newValue);
            }}
          >
            {children}
          </select>

          <label
            className={`absolute flex items-center text-slate-400 p-2 transition-all duration-200 ease-in-out ${
              active
                ? "text-xs -top-1 left-0"
                : "text-sm top-2/4 transform -translate-y-2/4"
            }`}
            htmlFor={name}
          >
            {label}
          </label>
        </div>
      )}
    />
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default SelectInput;
