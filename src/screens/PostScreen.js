import React, { useState, useEffect } from "react";
import { LogBox, View, StyleSheet, FlatList, ActivityIndicator, ScrollView, ImageBackground } from "react-native";
import { Card } from "react-native-elements";

import { AuthContext } from "../providers/AuthProvider";

import { saveComment, deleteComment } from "../functions/CommentFunctions";

import HeaderTop from "./../components/HeaderTop";
import InputCard from "../components/InputCard";
import PostCard from "./../components/PostCard";

import * as firebase from "firebase";
import "firebase/firestore";

const PostScreen = (props) => {
  let postInfo = props.route.params;
  const [posts, setPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [input, setInput] = useState([]);

  const image = { uri: "https://cdn.hipwallpaper.com/i/97/16/ZcjRI9.jpg" };
  const loadSinglePost = async () => {
    setLoading(true);
    firebase
      .firestore()
      .collection('posts')
      .doc(postInfo.id)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setPosts(documentSnapshot.data());
        }
      });
  };

  const loadComments = async () => {
    setLoading(true);
    // let allComments = await getAllComments(postInfo.id);
    // console.log(allComments.data());
    firebase
      .firestore()
      .collection('posts')
      .doc(postInfo.id)
      .onSnapshot((querySnapshot) => {
        let temp_comments = [];
        querySnapshot.data().comments.forEach((doc) => {
          temp_comments.push(doc);
        });
        setComments(temp_comments);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadSinglePost();
    loadComments();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['Setting a timer for a long period of time']);
  }, []);

  if (!loading) {
    return (
      <AuthContext.Consumer>
        {() => (
          <View style={styles.viewStyle}>
            <ImageBackground source={image} style={styles.image}>
              <HeaderTop
                DrawerFunction={() => {
                  props.navigation.toggleDrawer();
                }}
              />

              <Card>
                <Card.Title>Post</Card.Title>
                <PostCard
                  author={posts.author}
                  body={posts.body}
                />
              </Card>

              <ScrollView>
                <Card>
                  <Card.Title>Comments</Card.Title>
                  <FlatList
                    data={comments}
                    renderItem={({ item }) => {
                      return (
                        <View>
                          <Card>
                            <PostCard
                              author={item.commenter}
                              body={item.comment}
                              removeFunc={async () => {
                                deleteComment(
                                  item, postInfo.id, postInfo.data.userId
                                  );
                              }}
                            />
                          </Card>
                        </View>
                      );
                    }}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </Card>
              </ScrollView>
              <Card>
                <InputCard
                  Text="Post a Comment"
                  currentFunc={setInput}
                  currentText={input}
                  pressFunction={async () => {
                    saveComment(
                      postInfo.id,
                      input,
                      postInfo.data.userId
                    )
                  }}
                />
              </Card>
            </ImageBackground>
          </View>
        )}
      </AuthContext.Consumer>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="red" animating={true} />
      </View>
    );
  }
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

export default PostScreen;