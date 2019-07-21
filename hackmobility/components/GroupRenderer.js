import React, {Component} from 'react';
import {StyleSheet, FlatList, ScrollView} from 'react-native';

import {Card, ListItem, Button, Icon} from 'react-native-elements';

class GroupRenderer extends Component {
  /*constructor(props) {
    super(props);
    this.state = {
      GROUPS: [
        {
          id: 0,
          name: 'group 0',
        },
        {
          id: 1,
          name: 'group 1',
        },
        {
          id: 2,
          name: 'group 2',
        },
        {
          id: 3,
          name: 'group 3',
        },
        {
          id: 4,
          name: 'group 4',
        },
        {
          id: 5,
          name: 'group 5',
        },
        {
          id: 6,
          name: 'group 6',
        },
      ],
    };
  }*/

  render() {
    // const { navigate } = this.props.navigation;
    console.log(this.props.GROUPS);
    const renderGroups = ({item, index}) => {
      return (
        <ListItem
          key={index}
          title={item.name}
          hideChevron={true}
          onPress={this.props.onPress}
          // leftAvatar={{ source: require("./images/uthappizza.png") }}
        />
      );
    };

    return (
      <Card title='Groups:'>
        <ScrollView>
          <FlatList
            data={this.props.GROUPS}
            renderItem={renderGroups}
            keyExtractor={(item) => item.toString()}
            style={{flex: 1}}
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
