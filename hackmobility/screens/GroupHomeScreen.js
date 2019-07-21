import * as React from 'react';
import {Text, View, KeyboardAvoidingView, Button} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import RenderGroupMembers from '../components/RenderGroupMembers';
import {Card, ListItem, Icon} from 'react-native-elements';

class GroupHomeScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: 'GroupHome',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  state = {
    isReady: false,
  };

  HandleEndRide = async () => {
    this.props.navigation.navigate('EndRideScreen');
  };


  travelling = () => {
    return (
      <View>
        <Text>GroupHome</Text>
        <Card title='Travelling with you' style={{height: 30}}>
          <RenderGroupMembers />
        </Card>
        <BlueButton
          label='end of ride'
          onPress={this.HandleEndRide}
          style={{padding: 10}}
        />
      </View>
    );
  };

  render() {
    return (
      <View>
        {this.state.isReady && this.travelling}
      </View>
    );
  }
}

export default GroupHomeScreen;
