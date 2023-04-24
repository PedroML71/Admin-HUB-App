import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const SearchInput = ({ queryHandler }) => {
  const [search, setSearch] = useState(null);

  const changeHandler = (e) => {
    const value = e.target.value;

    if (!value) {
      setSearch(null);
    } else {
      setSearch(value);
    }
  };

  useEffect(() => {
    const render = () => {
      const timeOutId = setTimeout(() => {
        queryHandler(search);
      }, 1500);

      return timeOutId;
    };

    const timeOutId = render();

    return () => clearTimeout(timeOutId);
  }, [search]);

  return (
    <div className="relative">
      <div className="relative h-14 w-64 border rounded-sm bg-white text-dark-blue border-dark-blue border-opacity-25">
        <input
          className="outline-none w-full h-full rounded-sm bg-transparent text-sm p-2"
          type={"text"}
          id="search"
          placeholder="Search"
          onChange={changeHandler}
        />

        <MagnifyingGlassIcon className="w-4 text-dark-blue absolute top-2/4 right-2 transform -translate-y-2/4" />
      </div>
    </div>
  );
};

SearchInput.propTypes = {
  queryHandler: PropTypes.func.isRequired,
};

export default SearchInput;
