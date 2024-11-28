import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
        <li>
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/fetchold" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            FetchOld
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/fetchrq" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            FetchR
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/infinite" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Infinite
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/reducer" 
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Reducer
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
