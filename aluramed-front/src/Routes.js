import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
import NewPatient from "./containers/Patient/New";
import ListPatients from "./containers/Patient/List";
import ViewPatient from "./containers/Patient/View";
import EditPatient from "./containers/Patient/Edit";
import ResetPassword from "./containers/ResetPassword";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/login/reset">
        <ResetPassword />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/patients/new">
        <NewPatient />
      </Route>
      <Route exact path="/patients/:id">
        <ViewPatient />
      </Route>
      <Route exact path="/patients/:id/edit">
        <EditPatient />
      </Route>
      <Route exact path="/patients">
        <ListPatients />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
