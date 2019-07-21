import React, { Component } from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import GroupRenderer from "./GroupRenderer";
class MainComponent extends Component {
  state = {};
  render() {
    return (
      <View>
        <GroupRenderer />
      </View>
    );
  }
}

export default MainComponent;
