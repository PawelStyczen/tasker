import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "./components/signup/Signup";
import { AuthProvider } from "./contexts/AuthContext";

import Tasker from "./components/Tasker/Tasker";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";



function App() {
  
  return (
    <Router>
    
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Tasker} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
     
    </Router>
  );
}

export default App;
