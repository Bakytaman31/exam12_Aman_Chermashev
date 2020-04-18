import {
    GET_PICTURES_SUCCESS,
    GET_USERS_PICTURES_SUCCESS,
    POST_PICTURE_FAILURE,
    POST_PICTURE_SUCCESS
} from "../actions/picturesActions";

const initialState = {
    pictures: [],
    usersPictures: [],
    error: null
};

const picturesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PICTURES_SUCCESS:
            return {...state, pictures: action.pictures};
        case POST_PICTURE_SUCCESS:
            return {...state, error: null};
        case POST_PICTURE_FAILURE:
            return {...state, error: action.error};
        case GET_USERS_PICTURES_SUCCESS:
            return {...state, usersPictures: action.pictures};
        default:
            return state;
    }
};

export default picturesReducer;