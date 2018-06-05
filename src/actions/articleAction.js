import {GET_ART} from '../actionTypes';
import { database, storage } from '../firebase/firebase';



export function getArticles(){
    return dispatch => {
        database.on('value', snapshot => {
            dispatch ({
                type: GET_ART,
                payload: snapshot.val()
            }, console.log(snapshot))
            
        })
    }
}






// article element comes from articleCreator
export function saveArticle(article, file){
    return dispatch => database.push(article);
}

export function uploadImage(picture){
        return dispatch => storage.child('/images/' + picture.name).put(picture)
}



