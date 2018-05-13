import {GET_ART} from '../actionTypes';

export default function (state = {}, {type, payload}){
    switch(type){
        case GET_ART:
            return payload;
        default:
            return state;
    }
}