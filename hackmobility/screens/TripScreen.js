import * as React from 'react';
import {Text, View, KeyboardAvoidingView, Button} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import RenderGroupMembers from '../components/RenderGroupMembers';
import {Card, ListItem, Icon} from 'react-native-elements';
import {getUsersInGroup} from '../requests';
import Loading from '../components/Loading';

class TripScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: 'Your Trip Details',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  state = {
    loading: true,
  };

  componentDidMount = () => {
    getUsersInGroup(this.props.navigation.getParam('groupName')).then(
      (group_members) => {
        console.log(group_members);
        this.setState({loading: false});
        this.setState({group_members: group_members});
      }
    );
  };

  HandleEndRide = async () => {
    this.props.navigation.navigate('EndRideScreen', {
      userName: this.props.navigation.getParam('userName'),
    });
  };

  render() {
    return (
      <View>
        {!this.state.loading && (
          <View>
            <Card title='Travelling with you' style={{height: 30}}>
              <RenderGroupMembers groupMembers={this.state.group_members} />
            </Card>
            <BlueButton
              label='End Ride'
              onPress={this.HandleEndRide}
              style={{padding: 10}}
            />
          </View>
        )}
        {this.state.loading && (
          <Loading extraText='Waiting for all passengers to confirm...' />
        )}
      </View>
    );
  }
}

export default TripScreen;
