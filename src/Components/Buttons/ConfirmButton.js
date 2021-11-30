import { Link } from "react-router-dom"

export default function ConfirmButton(props) {

  const { onClick } = props;

  return (
    <Link to="/workorders">
      <button
        className="button is-info is-outlined confirm"
        onClick={onClick}>Confirm
      </button>
    </Link>
  )
}