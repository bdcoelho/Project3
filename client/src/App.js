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
import Find from "./pages/Find";
import Add from "./pages/Add";


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
    id: "",
    email: "",
    firstName: "",
    lastName: ""
  });

  useEffect(() => {
    axios.get("/api/user_data").then((result) => {
      console.log(result);
      if (result.data.email) {
        setLoggedIn(true);
        console.log(result.data);
        setUserData({
          id: result.data.id,
          email: result.data.email,
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          lng: result.data.lng,
          lat: result.data.lat
        });
      }
    });
  }, [loggedIn]);

  return (
    <UserContext.Provider value={userData}>
      {console.log("The user is "+ userData.email )}
      {console.log("The user lat is "+ userData.lat )}
      
      {console.log(loggedIn)}

      <Router>
        
      <Nav />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

          <Route exact path="/Login">
            {loggedIn===true ? <Redirect to="/Home"></Redirect> : console.log("login failed")}
            <Login setLoggedIn={setLoggedIn} />
          </Route>

          <Route exact path="/Signup" component={Signup} />

          <Route exact path="/Home" component={Home}>
          {loggedIn===false ? <Login setLoggedIn={setLoggedIn} /> : <Home/>}
          </Route>

          <Route exact path="/logout" component={Logout}>
            <Logout setLoggedIn={setLoggedIn} />
            {loggedIn===true ? null : <Redirect to="/" />}
          </Route>

          <Route exact path="/view" component={View}>
          {loggedIn===false ? <Login setLoggedIn={setLoggedIn} /> : <View/>}
          </Route>

          <Route exact path="/Find" component={Find}>
          {loggedIn===false ? <Login setLoggedIn={setLoggedIn} /> : <Find/>}
          </Route>

          <Route exact path="/Add" component={Add}>
          {loggedIn===false ? <Login setLoggedIn={setLoggedIn} /> : <Add/>}
          </Route>


          <Route exact path="*" component={Invalid}></Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
export default App;
