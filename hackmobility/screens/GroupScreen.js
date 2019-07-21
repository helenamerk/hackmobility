import * as React from 'react';
import {Text, View, KeyboardAvoidingView} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import {joinGroup, getGroups, startSmartcarAuth} from '../requests';
import FormTextInput from '../components/FormTextInput';

class GroupScreen extends React.Component {
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
    userName: '',
    password: '',
    failed: false,
    groups: [],
    newGroupName: '',
  };

  componentDidMount() {
    getGroups().then((groups) => {
      this.setState({groups: groups});
    });
  }

  handleGroupName = (groupName) => {
    this.setState({groupName: groupName});
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
      console.log(authURL);
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
        <GroupRenderer
          styles={{flex: 1, height: 10}}
          GROUPS={this.state.groups}
          onPress={this.groupPressHandler}
        />
      </View>
    );
  }
}

export default GroupScreen;
