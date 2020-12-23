import { getAllData, getDataJSON, removeData } from "../functions/AsyncStorageFunctions";

import * as firebase from "firebase";
import "firebase/firestore";

const getUserInfo = async (name) => {
    let allData = await getAllData();
    let userInfo = [];
    if (allData != null) {
        for (let data of allData) {
            if (data.includes(name)) {
                let info = await getDataJSON(data);
                userInfo.push(info)
            }
        }
        console.log(userInfo)
        return userInfo;
    }
}

const deleteUserInfo = async () => {

    firebase
        .firestore()
        .collection("posts")
        .where("userId", "in", [firebase.auth().currentUser.uid])
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                doc.ref.delete()
            });
        });

    firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .delete()

    firebase.auth().currentUser.delete()
    alert('User deleted!');
}

export { getUserInfo, deleteUserInfo };