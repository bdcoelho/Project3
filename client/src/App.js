import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "./utils/UserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Signup from "./pages/Signup";
import Nav from "./components/TopNav";
import axios from "axios";

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
      id: "",
      email: "",
      firstName: "",
      lastName: "",
    });


    useEffect(() => {
        axios.get("/api/user_data")
        .then(result => {
          if (result.data.email) {
            setLoggedIn(true);
            setUserData({
              id: result.data.id,
              email: result.data.email,
              firstName: result.data.firstName,
              lastName: result.data.lastName
            })
          }
        })
    }, [loggedIn]);

    return (
      <>
              <UserContext.Provider value={userData}>
                <Nav />
                <Route 
                  exact path="/"
                >
                  <Redirect to="/login" />
                </Route>

                <Route 
                  exact path="/Login"
                >
                {loggedIn ? 
                  <Redirect to="/Home"></Redirect> 
                  : null
                }
                <Login
                  setLoggedIn={setLoggedIn}
                />
                </Route>

                <Route 
                  exact path="/Signup"
                  component={Signup}
                  
                />

                <Route 
                  exact path="/Home"
                  component={Home}
                >
                {loggedIn ? 
                  null
                  : <Redirect to="/login"></Redirect> 
                }
                </Route>

                <Route 
                  exact path="/logout"
                  component={Logout}
                >
                  <Logout 
                    setLoggedIn={setLoggedIn}
                  />
                  {loggedIn ?
                    null 
                    : <Redirect to="/" />
                  }
                </Route>
              </UserContext.Provider>

      </>
    )
  }
  export default App;