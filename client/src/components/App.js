import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Search from "./pages/Search"
import SearchDetail from "./pages/SearchDetail"
// import Pernille from './pages/trip-create/Pernille';
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
          {!api.isLoggedIn() && <NavLink to="/login">Login</NavLink>}
          {api.isLoggedIn() && <Link to="/" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}
          <NavLink to="/secret">Secret</NavLink>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route path="/user-profile" component={userProfile} />
          {/* Katrin */}
          <Route path="/search/:id" exact component={Search} />
          <Route path="/search/:id/:friendTripId" exact component={SearchDetail} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
          {/* <Pernille /> */}

      </div>
    );
  }
}

export default App;
