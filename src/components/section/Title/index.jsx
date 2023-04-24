import React from "react";
import PropTypes from "prop-types";

const Title = ({ name, spacingStyle }) => {
  return (
    <section className={`${spacingStyle}`}>
      <div className="max-w-7xl mx-auto my-0 px-4 flex justify-center">
        <h1 className="text-5xl font-bold text-dark-blue">{name}</h1>
      </div>
    </section>
  );
};

Title.propTypes = {
  name: PropTypes.string.isRequired,
  spacingStyle: PropTypes.string.isRequired,
};

export default Title;
