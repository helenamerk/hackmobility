import * as React from 'react';
import {Text, View, KeyboardAvoidingView, Button} from 'react-native';
import {OverrideButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import RenderGroupMembers from '../components/RenderGroupMembers';
import {Card, ListItem, Icon} from 'react-native-elements';
import {getUsersInGroup} from '../requests';
import Loading from '../components/Loading';

class TripScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      header: () => null,
      /* These values are used instead of the shared configuration! */
    };
  };

  state = {
    loading: false,
    users: [],
  };

  componentDidMount = () => {
    console.log(this.props.navigation.getParam('group_name'));
    const users = this.props.navigation.getParam('users');
    console.log(users);
    this.setState({users: users});
    // getUsersInGroup(this.props.navigation.getParam('group_name')).then(
    //   (users) => {
    //     console.log(users);
    //     this.setState({loading: false});
    //     this.setState({users: users});
    //   }
    // );
  };

  HandleEndRide = async () => {
    this.props.navigation.navigate('EndRideScreen', {
      userName: this.props.navigation.getParam('userName'),
      users: this.state.users,
    });
  };

  render() {
    return (
      <View>
        {!this.state.loading && (
          <View style={{position: 'absolute', top: 50, width: '100%'}}>
            <Card title='Travelling with you' containerStyle={{padding: 40}}>
              <RenderGroupMembers groupMembers={this.state.users} />
            </Card>
            <OverrideButton label='End Ride' onPress={this.HandleEndRide} />
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
