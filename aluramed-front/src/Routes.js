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
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import ChangePassword from "./containers/ChangePassword";

export default function Routes() {
  return (
    <Switch>

      <AuthenticatedRoute exact path="/">
        <Home />
      </AuthenticatedRoute>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/login/reset">
        <ResetPassword />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>

      <AuthenticatedRoute exact path="/patients/new">
        <NewPatient />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/patients/:id">
        <ViewPatient />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/patients/:id/edit">
        <EditPatient />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/patients">
        <ListPatients />
      </AuthenticatedRoute>

      <AuthenticatedRoute exact path="/settings/password">
        <ChangePassword />
      </AuthenticatedRoute>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
