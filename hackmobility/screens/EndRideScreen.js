import * as React from 'react';
import {Text, View, KeyboardAvoidingView, Button} from 'react-native';
import {BlueButton, InverseButton} from '../components/Button';
import GroupRenderer from '../components/GroupRenderer';
import styles from '../config/styles';
import {joinGroup, getGroups} from '../requests';
import RenderGroupMembers from '../components/RenderGroupMembers';
import {Card, ListItem, Icon} from 'react-native-elements';
class EndRideScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: 'EndRide',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  state = {};
  GetDistanceTravelled = () => {
    const params = {
      mode: 'fastest;car;traffic:enabled',
      waypoint0: '37.7397,-121.4252',
      waypoint1: '37.9577,-121.2908',
      representation: 'display',
      routeAttributes: 'summary',
    };
    routingService.calculateRoute(
      params,
      (success) => {
        const routeLineString = new H.geo.LineString();
        success.response.route[0].shape.forEach((point) => {
          const [lat, lng] = point.split(',');
          routeLineString.pushPoint({
            lat: lat,
            lng: lng,
          });
        });
        const routePolyline = new H.map.Polyline(routeLineString, {
          style: {
            lineWidth: 5,
          },
        });
        map.addObject(routePolyline);
      },
      (error) => {
        console.log(error);
      }
    );

    console.log(success.response.route[0].summary.distance);
  };
  componentDidMount = () => {
    this.GetDistanceTravelled();
  };
  render() {
    return (
      <View style>
        <Text>EndRideScreen</Text>
        <Text>Thank you for riding with our app</Text>
        <Text>Points Earned: 90 katoh Points</Text>
        <BlueButton label='done' style={{padding: 10}} />
      </View>
    );
  }
}

export default EndRideScreen;
