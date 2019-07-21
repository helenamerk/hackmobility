<<<<<<< HEAD
import * as React from "react";
import { Text, View, KeyboardAvoidingView, Button } from "react-native";
import { BlueButton } from "../components/Button";
import GroupRenderer from "../components/GroupRenderer";
import styles from "../config/styles";
import colors from "../config/colors"; // 1.0.0-beta.27
import { checkGroupStatus } from "../requests";
import Storage from "../Storage";
import Loading from "../components/Loading";
import { Video } from "expo-av";
=======
import * as React from 'react';
import {Text, View, KeyboardAvoidingView, Button} from 'react-native';
import {BlueButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import colors from '../config/colors'; // 1.0.0-beta.27
import {checkGroupStatus} from '../requests';
import Storage from '../Storage';
import Loading from '../components/Loading';

>>>>>>> cfcf69de1245cce280af40224cae519648d04b2f
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
      <View
        style={{
          flex: 1,
<<<<<<< HEAD
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          width: "80%",
          height: "80%",
          backgroundColor: colors.WHITE
        }}
      >
        {!this.state.loading && (
          <>
            <Video
              source={require("../assets/location.mp4")}
              rate={1.0}
              volume={1.0}
              isMuted={false}
              resizeMode="Video.RESIZE_MODE_STRETCH"
              shouldPlay
              isLooping
              style={{
                width: "20%",
                height: "20%",
                justifyContent: "center",
                alignItems: "center"
              }}
            />
            <BlueButton
              label="Check in location"
              onPress={this.findCoordinates}
            />
          </>
=======
          justifyContent: 'center',
          alignSelf: 'center',
          width: '100%',
          backgroundColor: colors.WHITE,
        }}
      >
        {!this.state.loading && (
          <BlueButton
            label='Check in location'
            onPress={this.findCoordinates}
          />
>>>>>>> cfcf69de1245cce280af40224cae519648d04b2f
        )}
        {this.state.loading && (
          <Loading extraText='Ensuring all passengers are near vehicle.' />
        )}
      </View>
    );
  }
}

export default LocationCheckScreen;
