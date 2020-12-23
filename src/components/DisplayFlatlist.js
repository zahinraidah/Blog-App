import React, { useState, useEffect } from "react";

import { LogBox, View, StyleSheet, FlatList, ActivityIndicator, ImageBackground } from "react-native";
import { Card, Button, Text, Avatar, Input } from "react-native-elements";

import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { useNetInfo } from "@react-native-community/netinfo";

import PostCard from "./PostCard";
import HeaderTop from "./HeaderTop";
import LikeCommentButton from "./LikeCommentButton"

import * as firebase from "firebase";
import "firebase/firestore";

import { getAllPosts, savePost, deletePost } from "../functions/PostFunctions";

const DisplayFlatlist = (posts) => {
  console.log("posts");
  console.log(posts);
  return (
        <View style={styles.viewStyle}>
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
        </View>
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

export default DisplayFlatlist;