import AuthenticationButton from './Buttons/Auth-button'
import LoginButton from './Buttons/Login-button'
export default function MenuList(props) {


  return (
    <aside className="menu is-one-quarter">
    <ul>
    <li className="menu-label"><a >Welcome Admin</a></li>
    <li className="menu-list"><AuthenticationButton /></li>
      <ul>
        <li className="menu-list"><a>Glance at Today</a></li>
        <li className="menu-list"><a>Create Work Orders</a></li>
        <li className="menu-list"><a>Work Orders</a></li>
        <li className="menu-list"><a>Inventories</a></li>
        <li className="menu-list"><a>Summary</a></li>
      </ul>
    </ul>
    </aside>
  )
}