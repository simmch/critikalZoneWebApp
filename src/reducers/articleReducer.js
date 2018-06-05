import {GET_ART} from '../actionTypes';

export default function (state = {}, action){
    switch(action.type){
        case GET_ART:
            return action.payload;
        default:
            return state;
    }
}