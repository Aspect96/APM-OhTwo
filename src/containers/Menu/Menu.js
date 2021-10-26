import React from 'react';
import { NavLink } from 'react-router-dom';

import './Menu.css'

class Menu extends React.Component {
  render() { 
    return (
      <nav>
        <ul class="Menu-nav">
          <li class="Menu-nav-item left">
            <NavLink className="Menu-nav-link" to="/" exact>
              Home
            </NavLink>
          </li>
          <li class="Menu-nav-item left">
            <NavLink className="Menu-nav-link" to="/items">
              Items
            </NavLink>
          </li>
          <li class="Menu-nav-item right">
            <NavLink className="Menu-nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li class="Menu-nav-item right">
            <NavLink className="Menu-nav-link" to="/profile">
              Profile
            </NavLink>
          </li>
          <li class="Menu-nav-item right">
            <NavLink className="Menu-nav-link" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
 
export default Menu;