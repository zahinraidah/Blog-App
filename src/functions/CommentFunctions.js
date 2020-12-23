import * as firebase from "firebase";
import "firebase/firestore";
import { addNotifications, removeNotifications } from "../functions/NotificationFunctions";

const getAllComments = async (post) => {
    firebase
        .firestore()
        .collection('posts')
        .doc(post)
        .onSnapshot((querySnapshot) => {
            let temp_comments = [];
            querySnapshot.data().comments.forEach((doc) => {
                temp_comments.push(doc);
            });
            return temp_comments;
        });
}

const saveComment = (postID, input, userID) => {
    let commentID = Math.random().toString(36).substring(7)
    firebase
        .firestore()
        .collection('posts')
        .doc(postID)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                ID: commentID,
                comment: input,
                commenter: firebase.auth().currentUser.displayName,
                created_at: firebase.firestore.Timestamp.now(),
            }),
        })
        .then(() => {
            alert('Comment created successfully!');
        })
        .catch((error) => {
            alert(error);
        });

        addNotifications(userID, commentID, "comment")

}

const deleteComment = async (comment, postID, userID) => {
    if (comment.commenter == firebase.auth().currentUser.displayName) {
        firebase
            .firestore()
            .collection('posts')
            .doc(postID)
            .update({
                comments: firebase.firestore.FieldValue.arrayRemove(comment),
            })
            .then(() => {
                alert('Comment deleted!');
            });
        removeNotifications(comment.ID);
    }
    else {
        alert("You are not the author of the comment!");
    }
}
export { getAllComments, saveComment, deleteComment }