import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Card, Text, Avatar } from "react-native-elements";

const PostCard = (props) => {
  return (
    <TouchableOpacity onLongPress={props.removeFunc}>
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Avatar
          containerStyle={{ backgroundColor: "#ffab91" }}
          rounded
          icon={{ name: "user", type: "font-awesome", color: "black" }}
          activeOpacity={1}
        />
        <Text h4Style={{ padding: 10 }} h4>
          {props.author}
        </Text>
      </View>
      <Text
        style={{
          paddingVertical: 10,
        }}
      >
        {props.body}
      </Text>
    </View>
    </TouchableOpacity>
  );
};

export default PostCard;