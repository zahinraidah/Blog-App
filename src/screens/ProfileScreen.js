import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, ImageBackground } from "react-native";
import { Text, Card, Button, Image } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
import { AntDesign } from '@expo/vector-icons';
import HeaderTop from "../components/HeaderTop";
import { getAllPosts } from "../functions/PostFunctions";
import PostCard from "./../components/PostCard";
import LikeCommentButton from "../components/LikeCommentButton";
import { deleteUserInfo } from "../functions/ProfileFunctions";
import { clearAllData } from "../functions/AsyncStorageFunctions";

import * as firebase from "firebase";
import "firebase/firestore";

const ProfileScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);

  const background = { uri: "https://i.pinimg.com/originals/46/d2/70/46d27066a89f31495d2c70ae49a4413e.jpg" };
  const profile = { uri: "data:image/jpeg;base64,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" }

  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .where("userId", "in", [firebase.auth().currentUser.uid])
      .onSnapshot((querySnapshot) => {
        let temp_posts = [];
        querySnapshot.forEach((doc) => {
          temp_posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setPosts(temp_posts);
        setLoading(false);
      });
  };

  const loadUser = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection('user')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUser(documentSnapshot.data());
        }
      });
  };

  useEffect(() => {
    loadPosts();
    loadUser();
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <ImageBackground source={background} style={styles.image}>
            <HeaderTop
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
            />
            <Card>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={profile}
                  style={styles.imageStyle} />
                <Text style={{ fontSize: 32 }}>
                  {firebase.auth().currentUser.displayName}
                </Text>
              </View>
            </Card>
            <Button
              buttonStyle={{ backgroundColor: '#e02f2f' }}
              containerStyle={{ width: 150, marginLeft: 120, marginRight: 10, marginTop: 15 }}
              titleStyle={{ marginLeft: 5 }}
              title="Delete User"
              type='solid'
              alignSelf='center'
              icon={<AntDesign name="deleteuser" size={24} color="white" />}
              onPress={async () => {
                deleteUserInfo();
                auth.setIsLoggedIn(false);
                auth.setCurrentUser({});
              }}
            />
            <Card>
              <View>
              <Text style={{ alignSelf: "center", fontSize: 18 }}>
                  Born on: {user.birthday} {"\n"}
                  Email: {user.email} {"\n"}
                  SID: {user.sid}
              </Text>
              </View>
            </Card>
            <FlatList
              data={posts}
              renderItem={({ item }) => {
                return (
                  <View>
                    <Card>
                      <PostCard
                        author={item.data.author}
                        body={item.data.body}
                        removeFunc={async () => {
                          if (item.data.userId == firebase.auth().currentUser.uid) {
                            deletePost(item.id);
                          }
                          else {
                            alert("you are not the author of the post!");
                          }
                        }}
                      />
                      <Card.Divider />
                      <LikeCommentButton
                        postID={item.id}
                        likes={item.data.likes}
                        navigateFunc={() => {
                          props.navigation.navigate("PostScreen", item);
                        }}
                      />
                    </Card>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </ImageBackground>
        </View>
      )}
    </AuthContext.Consumer>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
  imageStyle: {
    height: 200,
    width: 200,
    margin: 5,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default ProfileScreen;