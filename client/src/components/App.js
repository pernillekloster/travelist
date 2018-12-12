import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TripDetail from "./pages/TripDetail";
import Search from "./pages/Search";
import SearchDetail from "./pages/SearchDetail";
import api from "../api";
import userProfile from "./pages/User-profile";
import Start from "./pages/Start";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  
  }

  render() {
    return (
      <div className="App">
        {!api.isLoggedIn() && (
          <div className="navbarLogout">
            <div id="pernille">
              <img src="/images/travelistgray.png" alt="travelist-logo" className="tl-icon" />
            </div>
          </div>
        )}

        {api.isLoggedIn() && (
          <div className="navbar" style={{ height: "88px" }}>
            <div className="col-3">
              <Link to="/home" className="home-btn">
                <img src="/images/home.png" alt="home-icon" className="h-icon" />
              </Link>
            </div>

            <div className="col-3">
              <Link to="/home" className="travelist-btn">
                <img
                  src="/images/travelistgray.png"
                  alt="travelist-logo"
                  className="travelisticon"
                />
              </Link>
            </div>

            <div className="col-3">
              <Link to="/user-profile" className="user-btn">
                <img src="/images/search.png" alt="search-icon" className="h-icon" />
              </Link>
            </div>
          </div>
        )}

        <Switch>
          <Route path="/" exact component={Start} />
          <Route path="/home" exact component={Home} />
          <Route path="/trip-detail/:id" exact component={TripDetail} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/user-profile" component={userProfile} />
          <Route path="/trip-detail/search/:id" exact component={Search} />
          <Route
            path="/search/:id/:friendTripId"
            exact
            component={SearchDetail}
          />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}

export default App;
