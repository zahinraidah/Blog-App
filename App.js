import { LogBox } from 'react-native';
import _ from 'lodash';

import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthContext, AuthProvider } from "./src/providers/AuthProvider";

import AppDrawerScreen from "./src/navigation/AppDrawer";
import AuthStackScreen from "./src/navigation/AuthStack";

import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBLMWVSdBXURY7ysPvorPi20G4mMq-CGdc",
  authDomain: "bloggingapp-2020.firebaseapp.com",
  databaseURL: "https://bloggingapp-2020.firebaseio.com",
  projectId: "bloggingapp-2020",
  storageBucket: "bloggingapp-2020.appspot.com",
  messagingSenderId: "449282403136",
  appId: "1:449282403136:web:38c41e7f16c612fa3068a5",
  measurementId: "G-PQT1PBGLVS"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

function App() {
  return (
    <AuthProvider>
      <AuthContext.Consumer>
        {(auth) => (
          <NavigationContainer>
            {auth.IsLoggedIn ? <AppDrawerScreen /> : <AuthStackScreen />}
          </NavigationContainer>
        )}
      </AuthContext.Consumer>
    </AuthProvider>
  );
}

export default App;