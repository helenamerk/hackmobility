import * as React from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import {joinGroup} from '../requests';

class LoginScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: params.groupName || 'Login',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  state = {
    userName: '',
    password: '',
    failed: false,
    groupName: '',
  };

  componentDidMount() {
    const groupName = this.props.navigation.getParam('groupName');
    this.setState({groupName: groupName});
  }

  handlePassengerChange = (userName) => {
    this.setState({userName: userName});
  };

  handlePasswordChange = (password) => {
    this.setState({password: password});
  };

  login = async () => {
    return joinGroup(
      this.state.userName,
      this.state.groupName,
      this.state.password
    ).then((res) => {
      console.log(res);
      return res;
    });
  };

  handleLoginPress = () => {
    this.login()
      .then((res) => {
        this.props.navigation.navigate('Home', {
          groupName: this.state.groupName,
          userName: this.state.userName,
        });
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

  groupPressHandler = (groupName) => {
    this.props.navigation.navigate('Home', {groupName: groupName});
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
              value={this.state.userName}
              onChangeText={this.handlePassengerChange}
              placeholder='Your Name'
            />
            <FormTextInput
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              placeholder='Password (for group)'
              secureTextEntry={true}
            />
            {message}
            <BlueButton label='Join Group' onPress={this.handleLoginPress} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
