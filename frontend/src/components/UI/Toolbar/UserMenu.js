import React, {useState} from 'react';
import {Link} from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";

import Avatar from "@material-ui/core/Avatar";

const UserMenu = ({user, logout}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton color="inherit" onClick={handleClick}>
                <Avatar alt="user" src={user.avatar}/>
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <ListItem disabled>Hello, {user.displayName || user.username}!</ListItem>
                <Divider/>
                <MenuItem onClick={handleClose} component={Link} to="/editProfile">Edit profile</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/newPost">Create new post</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/subscribe">Subscribe</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;