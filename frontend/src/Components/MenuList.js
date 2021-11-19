import React from 'react'
import { Link } from 'react-router-dom'
export default function MenuList(props) {


  return (
    <aside className="menu is-one-quarter">
    <ul>
    	<li className="menu-label"><a >Welcome Admin</a></li>
      <ul>
        <li className="menu-list"><a>Glance at Today</a></li>
        <li className="menu-list"><Link to="/workorders/create">Create Work Orders</Link></li>
        <li className="menu-list"><Link to="/workorders">Work Orders</Link></li>
        <li className="menu-list"><a>Inventories</a></li>
        <li className="menu-list"><a>Summary</a></li>
      </ul>
    </ul>
    </aside>
  )
}