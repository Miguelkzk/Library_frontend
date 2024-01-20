import { PlusLg } from "react-bootstrap-icons";

function Addbtn({ onClick }) {
  return (
    <button className="btn" onClick={onClick}>
      <PlusLg size={24} style={{ marginLeft: '1rem' }} />
    </button>
  )
}
export default Addbtn;