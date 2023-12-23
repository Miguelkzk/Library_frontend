import React from "react";
import { Eye } from "react-bootstrap-icons";

function ViewButton({ onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      <Eye size={24} />
    </button>
  );
}

export default ViewButton;
