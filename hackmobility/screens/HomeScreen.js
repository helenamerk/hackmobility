import React from 'react';
import styles from '../config/styles';
import {Button, View, Text} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import colors from '../config/colors'; // 1.0.0-beta.27
import {getUserGroup, getGroups} from '../requests';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };

  state = {
    groupName: '',
  };

  findCoordinates = () => {
    console.log('hello');
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position);
        console.log(location);
        this.setState({location});
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  };

  // reroute to login if no account found
  componentDidMount() {
    let {navigation} = this.props;
    console.log(getUserGroup());
    this.findCoordinates();
    // getUserGroup().then((groupName) => {
    //   if (!groupName) {
    //     this.props.navigation.navigate('LoginScreen');
    //   } else {
    //     this.setState({groupName: groupName});
    //   }
    // });
  }

  handleStartPress = async () => {
    //let email = this.props.navigation.getParam('userEmail', null);
    //let password = this.props.navigation.getParam('userPassword', null);

    this.props.navigation.navigate('RideStatus');
  };

  handleGroupChangePress = () => {
    console.log('essentially Logout');
    const groups = getGroups();
    this.props.navigation.navigate('GroupScreen');
  };

  handleNewGroup = () => {
    this.props.navigation.navigate('CreateGroup');
  };

  render() {
    let {navigation} = this.props;

    let currentGroup = getUserGroup();

    return (
      <View style={styles.container}>
        <Text>{currentGroup}</Text>
        <View style={styles.form}>
          <View style={styles.formFields}>
            <BlueButton label='Start' onPress={this.handleStartPress} />
            <InverseButton
              label='Select/Change Groups'
              onPress={this.handleGroupChangePress}
            />
            <InverseButton
              label='Create New Group'
              onPress={this.handleNewGroup}
            />
          </View>
        </View>
      </View>
    );
  }
}
export default HomeScreen;
