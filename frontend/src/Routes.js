import React from 'react';
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import NewPicture from "./containers/NewPicture/NewPicture";
import Main from "./containers/Main/Main";
import UsersPage from "./containers/UsersPage/UsersPage";

const Routes = () => {
    return (
        <Switch>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/newPicture" exact component={NewPicture}/>
            <Route path="/" exact component={Main}/>
            <Route path="/usersPictures/:id" component={UsersPage}/>
        </Switch>
    );
};

export default Routes;