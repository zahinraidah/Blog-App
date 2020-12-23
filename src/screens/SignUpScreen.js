import React, { useState } from "react";

import { View, StyleSheet, ImageBackground } from "react-native";
import { Input, Button, Card } from "react-native-elements";
import { FontAwesome, Feather, AntDesign, Ionicons } from "@expo/vector-icons";


import * as firebase from "firebase";
import "firebase/firestore";

const SignUpScreen = (props) => {
  const [bday, setBday] = useState("");
  const [Name, setName] = useState("");
  const [SID, setSID] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [, setLoading] = useState(false);

  const image = { uri: "https://cdn.hipwallpaper.com/i/97/16/ZcjRI9.jpg" };

  return (
    <View style={styles.viewStyle}>
      <ImageBackground source={image} style={styles.image}>
        <Card>
          <Card.Title>Welcome to AuthApp!</Card.Title>
          <Card.Divider />
          <Input
            leftIcon={<Ionicons name="ios-person" size={24} color="black" />}
            placeholder="Name"
            onChangeText={function (currentInput) {
              setName(currentInput);
            }}
          />
          <Input
            leftIcon={<Ionicons name="ios-school" size={24} color="black" />}
            placeholder="Student ID"
            onChangeText={function (currentInput) {
              setSID(currentInput);
            }}
          />
          <Input
            leftIcon={<FontAwesome name="envelope" size={24} color="black" />}
            placeholder="E-mail Address"
            onChangeText={function (currentInput) {
              setEmail(currentInput);
            }}
          />

          <Input
            placeholder="Password"
            leftIcon={<Feather name="key" size={24} color="black" />}
            secureTextEntry={true}
            onChangeText={function (currentInput) {
              setPassword(currentInput);
            }}
          />

          <Input
            placeholder="Date of Birth"
            leftIcon={<FontAwesome name="birthday-cake" size={24} color="black" />}
            onChangeText={function (currentInput) {
              setBday(currentInput);
            }}
          />

          <Button
            icon={<AntDesign name="user" size={24} color="white" />}
            title="  Sign Up!"
            type="solid"
            onPress={() => {
              if (Name && SID && Email && Password) {
                setLoading(true);
                firebase
                  .auth()
                  .createUserWithEmailAndPassword(Email, Password)
                  .then((userCreds) => {
                    userCreds.user.updateProfile({ displayName: Name });
                    firebase
                      .firestore()
                      .collection("users")
                      .doc(userCreds.user.uid)
                      .set({
                        name: Name,
                        sid: SID,
                        email: Email,
                        birthday: bday, 
                      })
                      .then((data) => {
                        setLoading(false);
                        alert("Account created successfully!");
                        alert(userCreds.user.uid);
                        props.navigation.navigate("SignIn");
                      })
                      .catch((error) => {
                        setLoading(false);
                        alert(error);
                      });
                  })
                  .catch((error) => {
                    setLoading(false);
                    alert(error);
                  });
              } else {
                alert("Fields can not be empty!");
              }
            }}
          />
          <Button
            type="clear"
            icon={<AntDesign name="login" size={24} color="dodgerblue" />}
            title="  Already have an account?"
            onPress={function () {
              props.navigation.navigate("SignIn");
            }}
          />
        </Card>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#4bacb8",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
export default SignUpScreen;
