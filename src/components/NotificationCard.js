import React, { useState } from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Text, Card, Button, Avatar, Header } from "react-native-elements";
import { AuthContext } from "../providers/AuthProvider";
const NotificationCard = (props) => {
  if (props.Type == "comment"){
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <View style={styles.viewStyle}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar
                containerStyle={{ backgroundColor: "cyan" }}
                rounded
                icon={{
                  name: "comment",
                  type: "font-awesome",
                  color: "black",
                }}
                activeOpacity={1}
              />
              <Text style={{ paddingHorizontal: 10 }}>
                {props.Text} Commented on Your Post.
              </Text>
            </View>
        </View>
      )}
    </AuthContext.Consumer>
  );}

  else{
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Avatar
                  containerStyle={{ backgroundColor: "cyan" }}
                  rounded
                  icon={{
                    name: "thumbs-o-up",
                    type: "font-awesome",
                    color: "black",
                  }}
                  activeOpacity={1}
                />
                <Text style={{ paddingHorizontal: 10 }}>
                  {props.Text} Liked Your Post.
                </Text>
              </View>
          </View>
        )}
      </AuthContext.Consumer>
    );}
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default NotificationCard;
