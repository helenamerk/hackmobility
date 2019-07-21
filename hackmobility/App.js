import React from "react";
import { View, WebView } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation"; // 1.0.0-beta.27
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import GroupScreen from "./screens/GroupScreen";
import LocationCheckScreen from "./screens/LocationCheckScreen";
import GroupHomeScreen from "./screens/GroupHomeScreen";
import EndRideScreen from "./screens/EndRideScreen";
import colors from "./config/colors";

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    GroupScreen: {
      screen: GroupScreen
    },
    LoginScreen: {
      screen: LoginScreen
    },
    LocationCheckScreen: {
      screen: LocationCheckScreen
    },
    GroupHomeScreen: {
      screen: GroupHomeScreen
    },
    EndRideScreen: {
      screen: EndRideScreen
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.PURPLE
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppContainer = createAppContainer(MainStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
