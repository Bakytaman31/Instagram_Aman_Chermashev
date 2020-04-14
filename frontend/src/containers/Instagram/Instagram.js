import React, {Component} from 'react';
import AppToolbar from "../../components/UI/Toolbar/AppToolbar";
import {connect} from "react-redux";
import {getPosts} from "../../store/actions/postsActions";
import InstagramCard from "../../components/InstagramCard/InstagramCard";
import {apiURL} from "../../constants";
import Grid from "@material-ui/core/Grid";
import imageNotAvailable from '../../assets/images/image_not_available.png';
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";

class Instagram extends Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (
            <>
                <AppToolbar/>
                <Grid container justify="center">
                    <Grid item xs={12} md={10} lg={4}>
                        <Grid container direction="column" spacing={10}>
                            {this.props.posts.length === 0 && <Grid item xs><Box pt={2} pb={2}>
                                <Typography variant="h4">There is nothing yet</Typography>
                            </Box></Grid>}
                            {this.props.posts.map(post => (
                                <Grid item xs key={post._id}>
                                    <InstagramCard
                                        date={post.date}
                                        name={post.user.displayName}
                                        text={post.text}
                                        image={post.image ? apiURL + '/' + post.image : imageNotAvailable}
                                        avatar={post.user.facebookId ? post.user.avatar : apiURL + '/' + post.user.avatar}
                                        tags={post.tags}
                                    />
                                </Grid>
                            ))
                            }
                        </Grid>
                    </Grid>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = state => ({
    posts: state.posts.posts
});

const mapDispatchToProps = dispatch => ({
    getPosts: () => dispatch(getPosts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Instagram);