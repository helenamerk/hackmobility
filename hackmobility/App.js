import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation'; // 1.0.0-beta.27

import colors from './config/colors';

import TripScreen from './screens/TripScreen';
import EndRideScreen from './screens/EndRideScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import GroupScreen from './screens/GroupScreen';
import LocationCheckScreen from './screens/LocationCheckScreen';
import MyWebViewScreen from './screens/MyWebViewScreen';
import CreateGroup from './screens/CreateGroup';
import Rewards from './screens/Rewards';

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    GroupScreen: {
      screen: GroupScreen,
    },
    LoginScreen: {
      screen: LoginScreen,
    },
    LocationCheckScreen: {
      screen: LocationCheckScreen,
    },
    TripScreen: {
      screen: TripScreen,
    },
    EndRideScreen: {
      screen: EndRideScreen,
    },
    MyWebViewScreen: {
      screen: MyWebViewScreen,
    },
    CreateGroup: {
      screen: CreateGroup,
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.BLACK,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    Rewards: {
      screen: Rewards,
    },
    MyWebViewModal: {
      screen: MyWebViewScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
