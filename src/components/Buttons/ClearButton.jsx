import { Button } from "react-bootstrap";
import { X } from "react-bootstrap-icons";

function ClearButton({ onClick }) {
  return (
    <Button variant="link " onClick={onClick}>
      <X size={20} />
    </Button>
  );
} export default ClearButton;