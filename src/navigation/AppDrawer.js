import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import ProfileScreen from "../screens/ProfileScreen";
import HomeTabScreen from "./HomeTab";


const AppDrawer = createDrawerNavigator();

const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator>
      <AppDrawer.Screen name="Home" component={HomeTabScreen} />
      <AppDrawer.Screen name="Profile" component={ProfileScreen} />
    </AppDrawer.Navigator>
  );
};

export default AppDrawerScreen;