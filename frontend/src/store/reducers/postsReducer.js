import {GET_POSTS_SUCCESS, GET_TAGS_SUCCESS, SEND_POST_FAILURE, SEND_POST_SUCCESS} from "../actions/postsActions";

const initialState = {
    posts: [],
    tags: [],
    error: null
};


const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TAGS_SUCCESS:
            return {...state, tags: action.tags};
        case GET_POSTS_SUCCESS:
            return {...state, posts: action.posts};
        case SEND_POST_SUCCESS:
            return {...state, error: null};
        case SEND_POST_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default postsReducer;