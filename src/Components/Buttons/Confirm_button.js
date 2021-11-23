import { Link } from "react-router-dom"
export default function Confirm_button(props) {
  const {onClick} = props;
  console.log('Confirm', props);
  return (
    <Link to="/workorders"><button onClick={onClick}>Confirm</button></Link>
  )
}