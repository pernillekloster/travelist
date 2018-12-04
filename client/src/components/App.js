import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TripDetail from './pages/TripDetail';
import Search from "./pages/Search"
import SearchDetail from "./pages/SearchDetail"
import api from '../api';
import userProfile from './pages/User-profile'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    // api.loadUser();
  }

  handleLogoutClick(e) {
    api.logout()
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Travelist</h1>
          <NavLink to="/" exact>Home</NavLink>
          {!api.isLoggedIn() && <NavLink to="/signup">Signup</NavLink>}
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}           {api.isLoggedIn() && <Link to="/login" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/trip-detail/:id" exact component={TripDetail} />      
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/user-profile" component={userProfile} />
          <Route path="/trip-detail/search/:id" exact component={Search} />
          <Route path="/search/:id/:friendTripId" exact component={SearchDetail} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
