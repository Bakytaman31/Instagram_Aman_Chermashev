import React, {Component} from 'react';
import AppToolbar from "../../components/UI/Toolbar/AppToolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {editProfile} from "../../store/actions/usersActions";

class EditProfile extends Component {
    state = {
        displayName: '',
        avatar: ''
    };

    componentDidMount() {
        this.setState({
            displayName: this.props.user.displayName,
            avatar: this.props.user.avatar
        })
    }

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });

        this.props.editProfile(formData);
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
                <AppToolbar/>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Box pt={2} pb={2}>
                            <Typography variant="h4">Change userdata</Typography>
                        </Box>
                        <form onSubmit={this.submitFormHandler}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item xs>
                                    <FormElement
                                        propertyName="displayName"
                                        title="Display name"
                                        type="text"
                                        value={this.state.displayName}
                                        onChange={this.inputChangeHandler}
                                        error={this.getFieldError('displayName')}
                                        placeholder="Enter display name"
                                        autoComplete="new-displayName"
                                    />
                                </Grid>
                                <Grid item xs>
                                    <FormElement
                                        type="file"
                                        propertyName="avatar"
                                        title="Avatar"
                                        onChange={this.fileChangeHandler}
                                    />
                                </Grid>
                                <Grid item xs>
                                    <Button type="submit" color="primary" variant="contained">
                                        Change data
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

const madDispatchToProps = dispatch => ({
    editProfile: profileData => dispatch(editProfile(profileData))
});

export default connect(mapStateToProps, madDispatchToProps)(EditProfile);
