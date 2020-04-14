import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
import {toast} from 'react-toastify';
import {apiURL} from "../../constants";

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const SUBSCRIBE_USER_SUCCESS = 'SUBSCRIBE_USER_SUCCESS';
export const SUBSCRIBE_USER_FAILURE = 'SUBSCRIBE_USER_FAILURE';

export const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
export const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
export const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

export const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
export const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
export const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const subscribeUserSuccess = () => ({type: SUBSCRIBE_USER_SUCCESS});
export const subscribeUserFailure = error => ({type: SUBSCRIBE_USER_FAILURE, error});

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());
            await axiosApi.post('/users', userData);
            dispatch(registerUserSuccess());
            dispatch(push('/login'));
        } catch (error) {
            if (error.response) {
                dispatch(registerUserFailure(error.response.data));
            } else {
                dispatch(registerUserFailure({global: 'Network error or no internet'}));
            }
        }
    }
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());
            const response = await axiosApi.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            dispatch(loginUserFailure(error.response.data));
        }
    }
};

export const loginWithFacebook = facebookData => {
    return async dispatch => {
        const response = await axiosApi.post('/users/facebook', facebookData);

        toast.success('Logged in with Facebook');
        dispatch(loginUserSuccess(response.data));
        dispatch(push('/'));
    };
};

export const logoutUser = () => {
    return async dispatch => {
        await axiosApi.delete('/users/sessions');

        toast.success('Logged out');
        dispatch(push('/'));
        dispatch(logoutUserSuccess());
    }
};

export const editProfile = profileData => {
    return async dispatch => {
        const response = await axiosApi.patch('/users/profile', profileData);
        response.data.avatar = apiURL + '/' + response.data.avatar;
        dispatch(loginUserSuccess(response.data));
        toast.success('Change data success');
        dispatch(push('/'));
    }
};

export const subscribe = name => {
    return async dispatch => {
        try{
            await axiosApi.post('/users/subscribe', name);
            dispatch(subscribeUserSuccess());
            dispatch(push('/'));
        } catch (e) {
            dispatch(subscribeUserFailure(e.response.data.message))
        }
    }
};