import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Homepage";
import Details from "../screens/Detailspage";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator>
    <Screen name="Home" component={Home} />
    <Screen name="Details" component={Details} />
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);