import React from 'react';
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";

const Routes = () => {
    return (
        <Switch>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/" exact />
        </Switch>
    );
};

export default Routes;