import React from "react";
import { Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";


function SearchButton({ onClick }) {
  return (
    <Button variant="success" onClick={onClick} style={{ marginLeft: '2rem' }}>
      <Search size={20} />
    </Button>
  );
}

export default SearchButton;
