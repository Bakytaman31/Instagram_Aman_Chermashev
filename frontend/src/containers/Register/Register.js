import React, {Component} from 'react';
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";
import {NavLink} from "react-router-dom";
import UserForm from "../../components/UserForm/UserForm";
import FacebookLogin from "../../components/FacebookLogin/FacebookLogin";

class Register extends Component {
    state = {
        username: '',
        password: '',
        displayName: '',
        avatar: ''
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];

            formData.append(key, value);
        });
        this.props.registerUser(formData);
    };

    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        })
    };

    render() {
        return (
            <>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Box pt={2} pb={2}>
                            <Typography variant="h4">Register</Typography>
                        </Box>
                        <Grid container direction="column" spacing={2}>
                            <Grid item xs>
                                <FacebookLogin content="Sign up with Facebook"/>
                            </Grid>
                            <Grid item xs>
                                <Divider/>
                            </Grid>
                        </Grid>
                        <UserForm
                            username={this.state.username}
                            inputChangeHandler={this.inputChangeHandler}
                            getFieldError={this.getFieldError}
                            password={this.state.password}
                            displayName={this.state.displayName}
                            fileChangeHandler={this.fileChangeHandler}
                            buttonContent="sing up"
                            onSubmit={this.submitFormHandler}
                        >
                            <Grid item xs>
                                <Divider/>
                            </Grid>
                            <Box pt={2} pb={2}>
                                <Typography variant="h5">Already have account?</Typography>
                            </Box>
                            <Grid item xs>
                                <Link
                                    component={NavLink}
                                    to="/login"
                                >
                                    <Button color="primary" variant="contained">
                                        Go to login form
                                    </Button>
                                </Link>
                            </Grid>
                        </UserForm>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError,
    loading: state.users.registerLoading,
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);