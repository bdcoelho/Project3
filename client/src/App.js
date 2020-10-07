import React, { useState, useEffect } from "react";
import UserContext from "./utils/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Invalid from "./pages/Invalid";
import Signup from "./pages/Signup";
import Nav from "./components/TopNav";
import View from "./pages/View";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// import Switch from "react-bootstrap/esm/Switch";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    email: null,
    firstName: null,
    lastName: null
  });

  useEffect(() => {
    axios.get("/api/user_data").then((result) => {
      if (result.data.email) {
        setLoggedIn(true);
        setUserData({
          id: result.data.id,
          email: result.data.email,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
        });
      }
    });
  }, [loggedIn]);

  return (
    <UserContext.Provider value={userData}>
      {console.log("The user is "+ userData.email )}

      <Router>
        
      <Nav />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

          <Route exact path="/Login">
            {userData.email ? <Redirect to="/Home"></Redirect> : null}
            <Login setLoggedIn={setLoggedIn} />
          </Route>

          <Route exact path="/Signup" component={Signup} />

          <Route exact path="/Home" component={Home}>
          {userData.email===null ? <Login setLoggedIn={setLoggedIn} /> : <Home/>}
          </Route>

          <Route exact path="/logout" component={Logout}>
            <Logout setLoggedIn={setLoggedIn} />
            {userData.email!==null ? null : <Redirect to="/" />}
          </Route>

          <Route exact path="/view" component={View}>
          {userData.email===null ? <Login setLoggedIn={setLoggedIn} /> : <View/>}
          </Route>

          <Route exact path="*" component={Invalid}></Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
export default App;
