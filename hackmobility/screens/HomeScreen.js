import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import {Video} from 'expo-av';
import Lottie from 'lottie-react-native';

import colors from '../config/colors';
import styles from '../config/styles';

import {getUserGroup, getUsersInGroup} from '../requests';

class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      header: () => null,
      /* These values are used instead of the shared configuration! */
    };
  };

  state = {
    groupName: '',
    users: [],
  };

  resetAnimation = () => {
    this.animation.reset();
    this.animation.play();
  };

  // reroute to login if no account found
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      getUserGroup().then((groupName) => {
        if (groupName === null) {
          console.log('no group name');
        } else {
          this.setState({groupName: groupName});
          getUsersInGroup(groupName).then((users) => {
            this.setState({users: users});
          });
        }
      });
    });
    this.animation.play();
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  handleStartPress = async () => {
    if (this.state.users.length >= 2) {
      console.log(this.state.users.length);
      this.props.navigation.navigate('LocationCheckScreen', {
        groupName: this.state.groupName,
        users: this.state.users,
      });
    } else {
      Alert.alert(
        'You have to have at least 1 passenger to earn rewards for your trip!'
      );
    }
  };

  handleGroupChangePress = () => {
    this.props.navigation.navigate('GroupScreen');
  };

  handleNewGroup = () => {
    this.props.navigation.navigate('CreateGroup');
  };

  onTrophyPress = () => {
    console.log('HELLO WORLD');
    this.props.navigation.navigate('Rewards');
  };

  render() {
    let {navigation} = this.props;
    let currentGroup = this.state.groupName || null;
    // if (currentGroup === null && this.props.navigation.getParam('groupName')) {
    //   currentGroup = this.props.navigation.getParam('groupName');
    //   if (currentGroup) {
    //     this.setState({groupName: currentGroup});
    //   }
    // }

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.animationContainer}
          onPress={this.onTrophyPress}
        >
          <Lottie
            ref={(animation) => {
              this.animation = animation;
            }}
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#fff',
            }}
            source={require('../assets/rewards.json')}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignSelf: 'center',
            width: '90%',
            height: '70%',
            flexDirection: 'flex-end',
            backgroundColor: colors.WHITE,
          }}
        >
          {currentGroup === null && (
            <Text style={styles.title}>Join or Create a Carpool Group</Text>
          )}
          {!!currentGroup && <Text style={styles.title}>{currentGroup}</Text>}
          {!!currentGroup && (
            <BlueButton label='Start Trip' onPress={this.handleStartPress} />
          )}
          <InverseButton
            label='Select/Change Groups'
            onPress={this.handleGroupChangePress}
          />
          <InverseButton
            label='Create New Group'
            onPress={this.handleNewGroup}
          />
        </View>
        <Video
          source={require('../assets/car.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode='cover'
          shouldPlay
          isLooping
          style={{width: '100%', height: '30%'}}
        />
      </View>
    );
  }
}
export default HomeScreen;
