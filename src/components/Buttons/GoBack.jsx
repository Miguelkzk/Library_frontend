import React from "react";
import { ChevronLeft } from "react-bootstrap-icons";


function GoBack({ onClick }) {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      <ChevronLeft size={20} />Back
    </button>
  );
}

export default GoBack;
