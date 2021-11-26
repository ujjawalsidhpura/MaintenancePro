import { Link } from 'react-router-dom'

export default function Cancel_button(props) {
  const {onClick} = props
  return (
    <Link to="/workorders"><a class="button is-danger is-outlined" onClick={onClick}>Cancel</a></Link>
  )
}