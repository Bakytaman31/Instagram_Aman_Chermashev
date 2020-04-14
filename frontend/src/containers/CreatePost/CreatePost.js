import React, {Component} from 'react';
import AppToolbar from "../../components/UI/Toolbar/AppToolbar";
import Grid from "@material-ui/core/Grid";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {sendPost, getTags} from "../../store/actions/postsActions";
import Alert from "@material-ui/lab/Alert";

class CreatePost extends Component {
    state = {
        text: '',
        tags: '',
        image: ''
    };

    componentDidMount() {
        this.props.getTags();
        this.setState({tags: this.props.tags})
    }

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            let value = this.state[key];


            formData.append(key, value);
        });
        this.props.sendPost(formData);
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

    tagsChangeHandler = (e, tags) => {
        this.setState({tags: JSON.stringify(tags)});
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
                            <Typography variant="h4">Create new post</Typography>
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
                                            propertyName="text"
                                            title="Text"
                                            onChange={this.inputChangeHandler}
                                            value={this.state.text}
                                            placeholder="Enter text"
                                            error={this.getFieldError('text')}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <FormElement
                                            type="file"
                                            propertyName="image"
                                            title="Image"
                                            onChange={this.fileChangeHandler}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <FormElement
                                            propertyName="tags"
                                            title="Tags"
                                            onChange={this.tagsChangeHandler}
                                            type="tags"
                                            tags={this.props.tags}
                                        />
                                    </Grid>
                                    <Grid item xs>
                                        <Button type="submit" color="primary" variant="contained">
                                            Save
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
    tags: state.posts.tags,
    error: state.posts.error
});

const mapDispatchToProps = dispatch => ({
    sendPost: post => dispatch(sendPost(post)),
    getTags: () => dispatch(getTags())
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);