import React from 'react';
import styles from '../config/styles';
import {Button, View, Text} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import colors from '../config/colors'; // 1.0.0-beta.27
import {getUserGroup} from '../requests';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
    };
  };

  state = {
    groupName: '',
  };

  // reroute to login if no account found
  componentDidMount() {
    let {navigation} = this.props;
    console.log(getUserGroup());
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
    this.props.navigation.navigate('LoginScreen');
  };

  render() {
    let {navigation} = this.props;

    let currentGroup = getUserGroup();

    return (
      <View style={styles.container}>
        <Text>{currentGroup}</Text>
        <View style={styles.form}>
          <View style={styles.formFields}>
            <InverseButton label='Start' onPress={this.handleStartPress} />
            <InverseButton
              label='Change Groups'
              onPress={this.handleGroupChangePress}
            />
          </View>
        </View>
      </View>
    );
  }
}
export default HomeScreen;
