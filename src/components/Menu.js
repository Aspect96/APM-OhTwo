import React from 'react';
import { NavLink } from 'react-router-dom';

class Menu extends React.Component {
  render() { 
    return (
      <nav>
        <ul class="AppNav">
          <li class="AppNavItem left">
            <NavLink className="AppNavLink" to="/" exact>
              Home
            </NavLink>
          </li>
          <li class="AppNavItem left">
            <NavLink className="AppNavLink" to="/items">
              Items
            </NavLink>
          </li>
          <li class="AppNavItem right">
            <NavLink className="AppNavLink" to="/about">
              About
            </NavLink>
          </li>
          <li class="AppNavItem right">
            <NavLink className="AppNavLink" to="/profile">
              Profile
            </NavLink>
          </li>
          <li class="AppNavItem right">
            <NavLink className="AppNavLink" to="/login">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}
 
export default Menu;