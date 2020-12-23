import * as firebase from "firebase";
import "firebase/firestore";

import { addNotifications } from "../functions/NotificationFunctions";

const addLike = (postID, userID, likes) => {
    firebase
        .firestore()
        .collection('posts')
        .doc(postID)
        .update({
            likes: likes + 1,
        });

        addNotifications(userID, Math.random().toString(36).substring(7), "like");
}

const removeLike = async (postID, userID, likes) => {
    firebase
        .firestore()
        .collection('posts')
        .doc(postID)
        .update({
            likes: likes - 1,
        });

        //removeNotifications(userID);
}
export { addLike, removeLike }