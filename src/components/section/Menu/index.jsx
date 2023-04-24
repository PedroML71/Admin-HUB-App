import React from "react";
import PropTypes from "prop-types";

const Menu = ({ children }) => {
  return (
    <section className="max-w-7xl mx-auto my-0 px-4 pb-8 flex justify-between items-center">
      {children}
    </section>
  );
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Menu;
