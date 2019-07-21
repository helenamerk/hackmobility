import * as React from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import FormTextInput from '../components/FormTextInput';
import styles from '../config/styles';

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
  };

  handlePassengerChange = (passengerName) => {
    this.setState({passengerName: passengerName});
  };

  handlePasswordChange = (password) => {
    this.setState({password: password});
  };

  login = (passengerName) => {
    return setGroup(passengerName);
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
              value='test'
              placeholder='Group Name (replace with select)'
            />
            <FormTextInput
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              placeholder='password'
              secureTextEntry={true}
            />
            {message}
            <InverseButton label='Join Group' onPress={this.handleLoginPress} />
            <InverseButton
              label='Create Account'
              onPress={this.handleNewGroupPress}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default LoginScreen;
