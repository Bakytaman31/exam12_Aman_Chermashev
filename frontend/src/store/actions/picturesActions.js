import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';
import { toast } from 'react-toastify';


export const GET_PICTURES_SUCCESS = 'GET_PICTURES_SUCCESS';

export const POST_PICTURE_SUCCESS = 'POST_PICTURE_SUCCESS';
export const POST_PICTURE_FAILURE = 'POST_PICTURE_FAILURE';

export const GET_USERS_PICTURES_SUCCESS = 'GET_USERS_PICTURES_SUCCESS';

export const getPicturesSuccess = pictures => ({type: GET_PICTURES_SUCCESS, pictures});

export const postPictureSuccess = () => ({type: POST_PICTURE_SUCCESS});
export const postPictureFailure = error => ({type: POST_PICTURE_FAILURE, error});

export const getUsersPicturesSuccess = pictures => ({type: GET_USERS_PICTURES_SUCCESS, pictures});

export const getPictures = () => {
    return async dispatch => {
        const response = await axiosApi.get('/pictures');
        dispatch(getPicturesSuccess(response.data));
    }
};

export const getUsersPictures = id => {
    return async dispatch => {
        const response = await axiosApi.get(`/pictures/${id}`);
        dispatch(getUsersPicturesSuccess(response.data));
    }
};

export const postPicture = picture => {
    return async dispatch => {
        try {
            await axiosApi.post('/pictures', picture);
            dispatch(postPictureSuccess());
            dispatch(push('/'));
            toast.success("Picture posted success");
        } catch (e) {
            dispatch(postPictureFailure(e.response.data.message));
            toast.error("Error");
        }
    }
};


//delete