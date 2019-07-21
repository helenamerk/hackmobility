import React, {Component} from 'react';
import {StyleSheet, FlatList, ScrollView} from 'react-native';

import {Card, ListItem, Button, Icon} from 'react-native-elements';

class GroupRenderer extends Component {
  render() {
    // const { navigate } = this.props.navigation;
    const renderGroups = ({item, index}) => {
      return (
        <ListItem
          key={index}
          title={item}
          hideChevron={true}
          onPress={() => this.props.onPress(item)}
          // leftAvatar={{ source: require("./images/uthappizza.png") }}
        />
      );
    };

    return (
      <Card title='Select Carpool Group'>
        <ScrollView style={{height: 350}}>
          <FlatList
            data={this.props.GROUPS}
            renderItem={renderGroups}
            keyExtractor={(item) => item.toString()}
          />
        </ScrollView>
      </Card>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default GroupRenderer;
