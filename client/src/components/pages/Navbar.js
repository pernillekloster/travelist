import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';

const Navbar = (props) => {
  console.log(props)

  return (
    <div className="navbar" style={{ height: '88px' }}>
      <NavLink to="/" exact style={{ height: '30%' }}>
        <img src="../../../images/home.png" class="icon" />
      </NavLink>
      <h3 class="travelist-icon" style={{ margin: 'auto' }}>Travelist</h3>
      <NavLink to="/user-profile" exact style={{ height: '30%' }}>
        <img src="../../../images/userprofile.png" class="icon" />
      </NavLink>
    </div>
  )
}




export default Navbar;