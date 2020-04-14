import React from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../UI/Form/FormElement";
import Button from "@material-ui/core/Button";

const UserForm = props => {
    return (
        <form onSubmit={props.onSubmit}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs>
                    <FormElement
                        propertyName="username"
                        title="Username"
                        value={props.username}
                        onChange={props.inputChangeHandler}
                        error={props.getFieldError('username')}
                        placeholder="Enter username"
                        autoComplete="new-username"
                    />
                </Grid>
                <Grid item xs>
                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={props.password}
                        onChange={props.inputChangeHandler}
                        error={props.getFieldError('password')}
                        placeholder="Enter password"
                        autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs>
                    <FormElement
                        propertyName="displayName"
                        title="Display name"
                        type="text"
                        value={props.displayName}
                        onChange={props.inputChangeHandler}
                        error={props.getFieldError('displayName')}
                        placeholder="Enter display name"
                        autoComplete="new-displayName"
                    />
                </Grid>
                <Grid item xs>
                    <FormElement
                        type="file"
                        propertyName="avatar"
                        title="Avatar"
                        onChange={props.fileChangeHandler}
                    />
                </Grid>
                <Grid item xs>
                    <Button type="submit" color="primary" variant="contained">
                        {props.buttonContent}
                    </Button>
                </Grid>
                {props.children}
            </Grid>
        </form>
    );
};

export default UserForm;