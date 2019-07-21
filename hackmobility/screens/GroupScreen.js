import * as React from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import {setGroup, getGroups} from '../requests';

class LoginScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: 'Login',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  state = {
    passengerName: '',
    password: '',
    failed: false,
    groups: [],
  };

  componentDidMount() {
    console.log(getGroups());
    let groups = getGroups();
    this.setState({groups: groups});
  }

  handlePassengerChange = (passengerName) => {
    this.setState({passengerName: passengerName});
  };

  handlePasswordChange = (password) => {
    this.setState({password: password});
  };

  login = async () => {
    return setGroup(this.state.groupName);
  };

  groupPressHandler = (groupName) => {
    this.props.navigation.navigate('LoginScreen', {groupName: groupName});
  };

  render() {
    if (this.state.failed) {
      message = (
        <Text style={styles.helpText}>
          Please check your username and password.
        </Text>
      );
    } else {
      message = <Text />;
    }
    return (
      <View>
        <InverseButton
          label='Create Group'
          onPress={this.handleNewGroupPress}
          styles={{top: 20}}
        />
        <GroupRenderer
          styles={{flex: 1, height: 10}}
          GROUPS={this.state.groups}
          onPress={this.groupPressHandler}
        />
      </View>
    );
  }
}

export default LoginScreen;
