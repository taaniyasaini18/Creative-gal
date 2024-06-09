import React from 'react'
import {Link} from 'react-router-dom'
import './Sidebar.css';


const sidebar = () => {
  return (
    <div className="sidebar">
    <ul>
    <li> <Link to="/">Manage Users</Link></li>
    <li> <Link to="/config">Config</Link></li>
    <li> <Link to="/crone">Crone</Link></li>
    <li> <Link to="/events">Events</Link></li>
    <li> <Link to="/managecustomers">Manage Customers</Link></li>
    <li> <Link to="/managetags">Manage Tags</Link></li>
    <li> <Link to="/logout">Logout</Link></li>

    </ul>
    </div>
  )
}

export default sidebar