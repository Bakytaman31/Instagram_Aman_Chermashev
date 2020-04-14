import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';

export const SEND_POST_FAILURE = 'SEND_POST_FAILURE';
export const SEND_POST_SUCCESS = 'SEND_POST_SUCCESS';

export const getTagsSuccess = tags => ({type: GET_TAGS_SUCCESS, tags});
export const getPostsSuccess = posts => ({type: GET_POSTS_SUCCESS, posts});

export const sendPostFailure = error => ({type: SEND_POST_FAILURE, error});
export const sendPostSuccess = () => ({type: SEND_POST_SUCCESS});

export const getTags = () => {
    return async dispatch => {
        const response = await axiosApi.get('/posts/tags');
        dispatch(getTagsSuccess(response.data));
    }
};

export const getPosts = () => {
    return async dispatch => {
        const response = await axiosApi.get('/posts');
        dispatch(getPostsSuccess(response.data));
    }
};

export const sendPost = post => {
    return async dispatch => {
        try {
            await axiosApi.post('/posts', post);
            dispatch(sendPostSuccess());
            dispatch(getPosts());
            dispatch(push('/'))
        } catch (e) {
            dispatch(sendPostFailure(e.response.data.message))
        }
    }
};