import { getAllData, getDataJSON, storeDataJSON } from "../functions/AsyncStorageFunctions";
import * as firebase from "firebase";
import "firebase/firestore";

const getAllNotifications = async () => {
  let allData = await getAllData();
  let allNotifications = [];
  if (allNotifications != null) {
    for (let key of allData) {
      if (key.includes('notification')) {
        let notification = await getDataJSON(key);
        allNotifications.push(notification)
      }
    }
    return allNotifications;
  }
}

const addNotifications = async (userID, commentID, type) => {
  firebase
    .firestore()
    .collection('users')
    .doc(userID)
    .update({
      notifications: firebase.firestore.FieldValue.arrayUnion({
        commentID: commentID,
        sender: firebase.auth().currentUser.displayName,
        receiver: userID,
        created_at: firebase.firestore.Timestamp.now(),
        type: type,
      }),
    })
    .catch((error) => {
      alert(error);
    });
}

const removeNotifications = async (commentID) => {
  firebase
    .firestore()
    .collection("user")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().notifications.commentID == commentID){
          doc.ref.update({
            notifications: firebase.firestore.FieldValue.arrayRemove()
          })
        }
      });
    });
}
export { getAllNotifications, addNotifications, removeNotifications};