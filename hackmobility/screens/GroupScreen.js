import * as React from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import {setGroup, getGroups, startSmartcarAuth} from '../requests';
import FormTextInput from '../components/FormTextInput';

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
    newGroupName: '',
  };

  componentDidMount() {
    console.log(getGroups());
    let groups = getGroups();
    this.setState({groups: groups});
  }

  handlePassengerChange = (passengerName) => {
    this.setState({passengerName: passengerName});
  };

  handleGroupName = (groupName) => {
    this.setState({groupName: groupName});
  };

  login = async () => {
    return setGroup(this.state.groupName);
  };

  groupPressHandler = (groupName) => {
    this.props.navigation.navigate('LoginScreen', {groupName: groupName});
  };

  handleNewGroupPress = () => {
    const openUrl = (authURL) => {
      console.log(authURL);
      this.props.navigation.navigate('MyWebViewScreen', {url: authURL});
    };
    startSmartcarAuth(this.state.groupName).then((authURL) => {
      console.log('helps');
      openUrl(authURL);
    });
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
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
          <View style={styles.form}>
            <View style={styles.formFields}>
              <FormTextInput
                value={this.state.newGroupName}
                onChangeText={this.handleGroupName}
                placeholder='New Group Name'
              />
            </View>
            <InverseButton
              label='Create Group'
              onPress={() => this.handleNewGroupPress('Hello World')}
              styles={{top: 20}}
            />
          </View>
        </KeyboardAvoidingView>
        <View>
          <GroupRenderer
            styles={{flex: 1, height: 10}}
            GROUPS={this.state.groups}
            onPress={this.groupPressHandler}
          />
        </View>
      </View>
    );
  }
}

export default LoginScreen;
