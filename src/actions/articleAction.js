import {GET_ART} from '../actionTypes';
import { database } from '../firebase/firebase';

export function saveArticle(article){
    return dispatch => database.push(article);
}

