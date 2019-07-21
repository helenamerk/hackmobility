import React, { Component } from "react";
import { View, Image, FlatList, ScrollView } from "react-native";

import { Card, ListItem, Button, Icon } from "react-native-elements";

class renderGroupMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GROUPMEMBERS: ["one", "two"]
    };
  }

  render() {
    const renderGroupMember = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          title={item}
          hideChevron={true}
          //   onPress={() => this.props.onPress(item)}
          // leftAvatar={{ source: require("./images/uthappizza.png") }}
        />
      );
    };

    return (
      //   <Card title="Travelling with you">
      <ScrollView style={{ height: 340 }}>
        <FlatList
          data={this.state.GROUPMEMBERS}
          renderItem={renderGroupMember}
          keyExtractor={item => item.toString()}
          style={{ flex: 1 }}
        />
      </ScrollView>
      //   </Card>
    );
  }
}

export default renderGroupMembers;
