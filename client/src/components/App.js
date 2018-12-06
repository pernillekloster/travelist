import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import { Button } from 'reactstrap'
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

  // handleRedirectToProfile = () => {
  //   this.props.history.push("/user-profile") // Redirect to the home page
  // }

  // handleRedirectToHome = () => {
  //   this.props.history.push("/home") // Redirect to the home page
  // }

  
  render() {
    return (
    <div className="App">

      {!api.isLoggedIn() &&
       <div className="navbar nav">
       <div id="pernille">
       <img src="../../images/travelistgray.png" className="tl-icon" />
       </div>
       </div>
      }
      
      {api.isLoggedIn() &&
      <div className="navbar" style={{ height: '88px' }}>

      <div class="col-3">
        <Link to="/home" exact className="home-btn">
          <img src="../../../images/home.png" className="h-icon" />
        </Link>
       </div>

       <div class="col-3"> 
        <Link  to="/home" exact className="travelist-btn" >
       <img src="../../images/travelistgray.png" className="travelisticon" />
       </Link>
       </div>
      
      <div class="col-3"> 
        <Link to="/user-profile" exact className="user-btn">
          <img src="../../../images/search.png" className="h-icon" />
        </Link>
      </div>

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