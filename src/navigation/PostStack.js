import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import PostScreen from "../screens/PostScreen";

const PostStack = createStackNavigator();

const PostStackScreen = () => {
  return (
    <PostStack.Navigator initialRouteName="HomeScreen">
      <PostStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <PostStack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{ headerShown: false }}
      />
    </PostStack.Navigator>
  );
};

export default PostStackScreen;