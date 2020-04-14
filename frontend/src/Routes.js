import React from 'react';
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Instagram from "./containers/Instagram/Instagram";
import EditProfile from "./containers/EditProfile/EditProfile";
import CreatePost from "./containers/CreatePost/CreatePost";
import Subscribe from "./containers/Subscribe/Subscribe";
const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props}/> : <Redirect to="/register"/>
);

const Routes = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Switch>
            <ProtectedRoute isAllowed={user} path="/" exact component={Instagram}/>
            <Route path="/register" exact component={Register}/>
            <Route path="/login" exact  component={Login}/>
            <Route path="/editProfile" exact component={EditProfile}/>
            <Route path="/newPost" exact component={CreatePost}/>
            <Route path="/subscribe" exact component={Subscribe}/>
        </Switch>
    );
};

export default Routes;