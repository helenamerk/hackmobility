import * as React from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import {setGroup, getGroups} from '../requests';

class LoginScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: '',
      /* These values are used instead of the shared configuration! */
      header: null,
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
    return setGroup(this.state.groupId);
  };

  handleLoginPress = () => {
    console.log('Login button pressed');

    this.login()
      .then((res) => {
        this.props.navigation.navigate('Home');
      })
      .catch((err) => {
        this.setState({failed: true});
        console.log('login failed');
        console.log(err);
      });

    console.log(styles.container);
  };

  handleNewGroupPress = () => {
    console.log('pressed!');
  };

  handleGroupNameChange = (text) => {
    this.setState({groupName: text});
  };

  groupPressHandler = (groupId) => {
    this.props.navigation.navigate('Home', {groupId: groupId});
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
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <View style={styles.form}>
          <View style={styles.formFields}>
            <FormTextInput
              value={this.state.passengerName}
              onChangeText={this.handlePassengerChange}
              placeholder='Your Name'
            />
            <FormTextInput
              value={this.state.groupName}
              onChangeText={this.handleGroupNameChange}
              placeholder='Group Name'
            />
            <FormTextInput
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              placeholder='Password (for group)'
              secureTextEntry={true}
            />
            {message}
            <BlueButton label='Join Group' onPress={this.handleLoginPress} />
            <InverseButton
              label='Create Group'
              onPress={this.handleNewGroupPress}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
