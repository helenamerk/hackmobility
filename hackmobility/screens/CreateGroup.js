import * as React from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import {joinGroup, getGroups, startSmartcarAuth} from '../requests';
import FormTextInput from '../components/FormTextInput';

class CreateGroup extends React.Component {
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
    failed: false,
    newGroupName: '',
    password: '',
    userName: '',
  };

  componentDidMount() {}

  handleGroupName = (newGroupName) => {
    this.setState({newGroupName: newGroupName});
  };

  handlePasswordChange = (password) => {
    this.setState({password: password});
  };

  handleNameChange = (userName) => {
    this.setState({userName: userName});
  };

  handleNewGroupPress = () => {
    const openUrl = (authURL) => {
      console.log(authURL);
      this.props.navigation.navigate('MyWebViewScreen', {url: authURL});
    };
    startSmartcarAuth(this.state.newGroupName, this.state.password).then(
      (authURL) => {
        joinGroup(
          this.state.userName,
          this.state.newGroupName,
          this.state.password
        ).then((res) => {
          console.log('joined!');
        });
        openUrl(authURL);
      }
    );
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
              value={this.state.newGroupName}
              onChangeText={this.handleGroupName}
              placeholder='New Group Name'
            />
            <FormTextInput
              value={this.state.password}
              onChangeText={this.handlePasswordChange}
              placeholder='Password (for group)'
              secureTextEntry={true}
            />
            <FormTextInput
              value={this.state.handleNameChange}
              onChangeText={this.handleNameChange}
              placeholder='Your Name (as a passenger)'
            />
            <BlueButton
              label='Create Group'
              onPress={() => this.handleNewGroupPress()}
              styles={{top: 20}}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default CreateGroup;
