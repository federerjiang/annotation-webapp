import React, { useState, useCallback } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

// import Users from "./user/pages/Users";
import CatNameLabel from "./names/pages/catNameLabel";
import EvalNameLabel from "./names/pages/evalNameLabel";
import Auth from "./user/pages/Auth";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from './shared/hooks/auth-hook';


const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    console.log('hello');
    console.log(userId);
    routes = (
      <Switch>
        <Route path="/task-1" exact>
          <CatNameLabel userId={userId}/>
        </Route>
        <Route path="/task-2" exact>
          <EvalNameLabel userId={userId}/>
        </Route>
        <Redirect to="/task-1" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
};

export default App;
