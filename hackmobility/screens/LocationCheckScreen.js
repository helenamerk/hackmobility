import * as React from 'react';
import {View, Alert, Text} from 'react-native';
import {BlueButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import colors from '../config/colors'; // 1.0.0-beta.27
import {checkGroupStatus} from '../requests';
import Storage from '../Storage';
import Loading from '../components/Loading';

class LocationCheckScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: 'Verify Trip Details',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  state = {
    location: {},
    loading: false,
    success: false,
    user_name: '',
    group_name: '',
    users: [],
    response_count: 0,
  };

  componentDidMount = () => {
    Storage.getItem('user_name').then((res) => {
      console.log(res);
      this.setState({user_name: res});
    });
    this.setState({group_name: this.props.navigation.getParam('group_name')});
    this.setState({users: this.props.navigation.getParam('users')});
    this.setState({total: this.props.navigation.getParam('users').length});
  };

  // continueChecking = () => {
  //   const group_name = this.props.navigation.getParam('group_name');
  //   checkGroupStatus(this.state.location, this.state.user_name).then((res) => {
  //     if (res) {
  //       clearInterval(this.state.timeoutid);
  //       this.setState({loading: false});
  //       this.props.navigation.navigate('TripScreen', {group_name: group_name});
  //     } else {
  //       console.log('sad');
  //     }
  //   });
  // };

  continueChecking = () => {
    checkGroupStatus(this.state.location, this.state.user_name).then((res) => {
      if (res.status) {
        clearInterval(this.state.timeoutid);
        this.setState({loading: false});
        if (res.in_range) {
          this.props.navigation.navigate('TripScreen', {
            group_name: this.state.group_name,
            users: this.state.users,
          });
        } else {
          Alert.alert(
            'Hmmm. Looks like you are too far from the vehicle to join this trip.',
            'Hmmm. Looks like you are too far from the vehicle to join this trip.',
            [
              {
                text: 'Go Home',
                onPress: this.handleLocationFailure,
              },
            ],
            {cancelable: false}
          );
        }
      } else {
        this.setState({response_count: res.count});
        console.log('sad');
      }
    });
  };

  handleLocationFailure = async () => {
    this.props.navigation.navigate('Home', {group_name: this.state.group_name});
  };

  handleUserLocationFound = async () => {
    console.log('confirm navigation');
    let timeoutid = setInterval(this.continueChecking, 2000);
    this.setState({timeoutid: timeoutid});
  };

  LoadingComponent = () => {
    console.log('loading now');
  };

  findCoordinates = () => {
    this.LoadingComponent();
    this.setState({loading: true});
    navigator.geolocation.getCurrentPosition(
      (location) => {
        this.setState({location: location});
        this.handleUserLocationFound();
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: false, timeout: 0, maximumAge: 1000}
    );
  };
  render() {
    const loadingText =
      'Ensuring all passengers are near vehicle!\nCurrently ' +
      this.state.response_count +
      '/' +
      this.state.total +
      ' have responsed.';
    return (
      <View style={{flex: 1}}>
        <View style={styles.container_margin}>
          <Text style={styles.title}>Verifying a few things...</Text>
          <Text style={styles.subtitleText}>
            In order to ensure a safe trip, calibrate, and reward redeemable
            credit, we need your location. We take privacy seriously, and store
            this only for the duration of your trip.
          </Text>
        </View>
        <View style={styles.container_margin}>
          {!this.state.loading && (
            <BlueButton
              label='Check My Location!'
              onPress={this.findCoordinates}
            />
          )}
          {this.state.loading && <Loading extraText={loadingText} />}
        </View>
      </View>
    );
  }
}

export default LocationCheckScreen;
