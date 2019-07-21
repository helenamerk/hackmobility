import * as React from 'react';
import {Text, View, KeyboardAvoidingView, Button} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import {joinGroup, checkGroupStatus} from '../requests';
import Storage from '../Storage';
import Loading from '../components/Loading';

class LocationCheckScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: 'LocationCheck',
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
  };

  componentDidMount = () => {
    Storage.getItem('user_name').then((res) => {
      console.log(res);
      this.setState({user_name: res});
    });
  };

  continueChecking = () => {
    const groupName = this.props.navigation.getParam('groupName');
    checkGroupStatus(this.state.location, this.state.user_name).then((res) => {
      if (res) {
        clearInterval(this.state.timeoutid);
        this.setState({loading: false});
        this.props.navigation.navigate('TripScreen', {groupName: groupName});
      } else {
        console.log('sad');
      }
    });
  };
  handleLocationSuccess = async () => {
    console.log('confirm navigation');

    let timeoutid = setInterval(this.continueChecking, 5000);
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
        console.log(location);
        this.setState({location: location});
        this.handleLocationSuccess();
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: false, timeout: 0, maximumAge: 1000}
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {!this.state.loading && (
          <BlueButton
            label='Check in location'
            onPress={this.findCoordinates}
          />
        )}
        {this.state.loading && <Loading />}
      </View>
    );
  }
}

export default LocationCheckScreen;
