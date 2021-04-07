import { faMusic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Navbar = ({ isLibraryOpen, setIsLibraryOpen }) => {
  return (
    <nav className="navbar">
      <h2>Go Go Audio</h2>
      <button
        onClick={() => {
          setIsLibraryOpen(!isLibraryOpen);
        }}
      >
        Library <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Navbar;
