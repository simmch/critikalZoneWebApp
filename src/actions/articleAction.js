import {GET_ART} from '../actionTypes';
import { database } from '../firebase/firebase';

// article element comes from articleCreator
export function saveArticle(article){
    return dispatch => database.push(article);
}

