import React from "react";
import styles from "../config/styles";
import { View, Text } from "react-native";
import { BlueButton, InverseButton } from "../components/Button";
import colors from "../config/colors"; // 1.0.0-beta.27
import { getUserGroup, getGroups } from "../requests";
import { Video } from "expo-av";

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: () => null
    };
  };

  state = {
    groupName: ""
  };

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const location = JSON.stringify(position);
        console.log(location);
        this.setState({ location });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  // reroute to login if no account found
  componentDidMount() {
    // this.findCoordinates();
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      getUserGroup().then((groupName) => {
        if (groupName === null) {
        } else {
          this.setState({groupName: groupName});
        }
      });
    });
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();
  }

  handleStartPress = async () => {
    this.props.navigation.navigate('LocationCheckScreen', {
      groupName: this.state.groupName,
    });
  };

  handleGroupChangePress = () => {
    this.props.navigation.navigate('GroupScreen');
  };

  handleNewGroup = () => {
    this.props.navigation.navigate("CreateGroup");
  };

  render() {
    let {navigation} = this.props;
    let currentGroup = this.state.groupName || null;
    if (currentGroup === null && this.props.navigation.getParam('groupName')) {
      currentGroup = this.props.navigation.getParam('groupName');
      if (currentGroup) {
        this.setState({groupName: currentGroup});
      }
    }

    return (
      <View style={styles.container}>
        <View
          style={{
            flex: 2,
            justifyContent: "center",
            alignSelf: "center",
            width: "90%",
            height: "70%",
            flexDirection: "flex-end",
            backgroundColor: colors.WHITE
          }}
        >
          {currentGroup === null && (
            <Text
              style={{
                textAlign: 'center',
                fontSize: 50,
                margin: 20,
              }}
            >
              Join or Create a Carpool Group
            </Text>
          )}
          {!!currentGroup && (
            <Text
              style={{
                textAlign: "center",
                fontSize: 50,
                letterSpacing: 5,
                margin: 20
              }}
            >
              {currentGroup}
            </Text>
          )}
          {!!currentGroup && (
            <BlueButton label="Start Trip" onPress={this.handleStartPress} />
          )}
          <InverseButton
            label="Select/Change Groups"
            onPress={this.handleGroupChangePress}
          />
          <InverseButton
            label="Create New Group"
            onPress={this.handleNewGroup}
          />
        </View>
        <Video
          source={require("../assets/car.mp4")}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: "100%", height: "30%" }}
        />
      </View>
    );
  }
}
export default HomeScreen;
