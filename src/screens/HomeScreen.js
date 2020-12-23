import React, { useState, useEffect } from "react";

import { LogBox, View, StyleSheet, FlatList, ActivityIndicator, ImageBackground } from "react-native";
import { Card, Button, Input } from "react-native-elements";

import { Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";

import PostCard from "./../components/PostCard";
import HeaderTop from "../components/HeaderTop";
import LikeCommentButton from "../components/LikeCommentButton";

import * as firebase from "firebase";
import "firebase/firestore";

import { savePost, deletePost } from "../functions/PostFunctions";

const image = { uri: "https://cdn.hipwallpaper.com/i/97/16/ZcjRI9.jpg" };

const HomeScreen = (props) => {
  const netinfo = useNetInfo();
  if (netinfo.type != "unknown" && !netinfo.isInternetReachable) {
    alert("No Internet!");
  }
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection("posts")
      .orderBy("created_at", "desc")
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

  useEffect(() => {
    loadPosts();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['Setting a timer for a long period of time']);
  }, []);

  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
          <ImageBackground source={image} style={styles.image}>
            <HeaderTop
              DrawerFunction={() => {
                props.navigation.toggleDrawer();
              }}
            />
            <Card>
              <Input
                placeholder="What's On Your Mind?"
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
                onChangeText={(currentText) => {
                  setInput(currentText);
                }}
              />
              <Button
                title="Post"
                type="outline"
                onPress={function () {
                  setLoading(true);
                  savePost(
                    auth.CurrentUser.uid,
                    input,
                    auth.CurrentUser.displayName
                  );
                }}
              />
            </Card>
            <ActivityIndicator size="large" color="red" animating={loading} />
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
                        userID={item.data.userId}
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
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

export default HomeScreen;