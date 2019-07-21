import * as React from "react";
import { Text, View, KeyboardAvoidingView, Button } from "react-native";
import { BlueButton, InverseButton } from "../components/Button";
import GroupRenderer from "../components/GroupRenderer";
import styles from "../config/styles";
import { setGroup, getGroups } from "../requests";
import Loading from "../components/Loading";
class LocationCheckScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: "LocationCheck",
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor
    };
  };

  state = {
    location: {},
    loading: false,
    success: false
  };

  handleLocationSuccess = async () => {
    //let email = this.props.navigation.getParam('userEmail', null);
    //let password = this.props.navigation.getParam('userPassword', null);
    console.log("confirm navigation");
    this.props.navigation.navigate("EndRideScreen");
  };

  LoadingComponent = () => {
    console.log("loading now");
  };

  findCoordinates = () => {
    this.LoadingComponent();
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log(location);
        this.setState({ location });
        this.handleLocationSuccess();
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: false, timeout: 0, maximumAge: 1000 }
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {!this.state.loading && (
          <BlueButton
            label="Check in location"
            onPress={this.findCoordinates}
          />
        )}
        {this.state.loading && <Loading />}
      </View>
    );
  }
}

export default LocationCheckScreen;
