import { Link } from 'react-router-dom'

export default function CancelButton(props) {
  const { onClick } = props
  return (
    <Link to="/workorders">
      <button
        className="button is-danger is-outlined"
        onClick={onClick}>
        Cancel
      </button>
    </Link>
  )
}