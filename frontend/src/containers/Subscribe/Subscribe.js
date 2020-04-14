import React, {Component} from 'react';
import AppToolbar from "../../components/UI/Toolbar/AppToolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {subscribe} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import Alert from "@material-ui/lab/Alert";

class Subscribe extends Component {
    state = {
        name: ''
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.subscribe({name: this.state.name});
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    render() {
        return (
            <>
                <AppToolbar/>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Box pt={2} pb={2}>
                            <Typography variant="h4">Subscribe</Typography>
                        </Box>
                        <Grid container direction="column" spacing={2}>
                            {this.props.error && (
                                <Grid item xs>
                                    <Alert severity="error">{this.props.error}</Alert>
                                </Grid>
                            )}
                            <form onSubmit={this.submitFormHandler}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item xs>
                                        <FormElement
                                            propertyName="name"
                                            title="Name"
                                            onChange={this.inputChangeHandler}
                                            value={this.state.name}
                                            placeholder="Enter name"
                                            error={this.getFieldError('text')}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <Button type="submit" color="primary" variant="contained">
                                            Subscribe
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.subscribeError
});

const mapDispatchToProps = dispatch => ({
    subscribe: name => dispatch(subscribe(name))
});

export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);