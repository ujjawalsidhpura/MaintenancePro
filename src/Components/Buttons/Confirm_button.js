import { Link } from "react-router-dom"

export default function Confirm_button(props) {

  const { onClick } = props;

  return (
    <Link to="/workorders">
      <button
        className="button is-info is-outlined"
        onClick={onClick}>Confirm
      </button>
    </Link>
  )
}