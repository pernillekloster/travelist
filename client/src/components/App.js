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
import Start from "./pages/Start"

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
      {!api.isLoggedIn() &&
       <h3 class="travelist-icon" style={{ margin: 'auto' }}>Travelist</h3>
      }

      {api.isLoggedIn() &&
      <div className="navbar" style={{ height: '88px' }}>
        <NavLink to="/home" exact style={{ height: '40%' }}>
          <img src="../../../images/home.png" class="icon" />
        </NavLink>

        <h3 class="travelist-icon" style={{ margin: 'auto' }}>Travelist</h3>

        {api.isLoggedIn() && <Link to="/login" onClick={(e) => this.handleLogoutClick(e)}>Logout</Link>}

        <NavLink to="/user-profile" exact style={{ height: '40%' }}>
          <img src="../../../images/userprofile.png" class="icon" />
        </NavLink>
      </div>
      }
    
        <header className="App-header">
        </header>
        <Switch>
          <Route path="/" exact component={Start} />
          <Route path="/home" exact component={Home} />
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
