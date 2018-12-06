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

  
  render() {
    return (
    <div className="App">

      {!api.isLoggedIn() &&
       <div className="navbar" style={{ margin: 'auto' }}>
       <img src="../../images/travelistgray.png" className="travelisticon" />
       </div>
      }
      
      {api.isLoggedIn() &&
      <div className="navbar" style={{ height: '88px' }}>

         <NavLink to="/home" exact style={{ height: '40%' }}>
          <img src="../../../images/home.png" className="h-icon" />
        </NavLink>
        
        <NavLink className="" to="/home" exact>
       <img src="../../images/travelistgray.png" className="travelisticon" />
       </NavLink>
        
        <NavLink to="/user-profile" exact  className="up-icon">
          <img src="../../../images/userprofile.png" className="hello" style={{ height: '40%' }} />
        </NavLink>
<<<<<<< HEAD
=======

>>>>>>> 7a679921270dc43365dc9971fee94ee9f924d826
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