import { Link } from 'react-router-dom'

export default function Cancel_button(props) {
  const {onClick} = props
  return (
    <Link to="/workorders"><button onClick={onClick}>Cancel</button></Link>
  )
}