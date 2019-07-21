import React, { Component } from "react";
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from "react-native";
class Loading extends Component {
  state = {};
  render() {
    return <ActivityIndicator size="large" color="#428AF8" />;
  }
}

export default Loading;
