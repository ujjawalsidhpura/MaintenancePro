import { Link } from "react-router-dom"
export default function Confirm_button(props) {
  const {onClick} = props;
  return (
    <Link to="/workorders"><a class="button is-info is-outlined" onClick={onClick}>Confirm</a></Link>
  )
}