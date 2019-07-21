import * as React from 'react';
import {Text, View} from 'react-native';
import {BlueButton} from '../components/Button';
import {getUserPoints} from '../requests';

class EndRideScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: 'Ride Summary',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  state = {
    points: 'loading...',
  };

  componentDidMount = () => {
    console.log('?');
    getUserPoints().then((points) => {
      console.log(points);
      this.setState({points: points});
    });
  };

  // TOOD: implement heremaps

  // GetDistanceTravelled = () => {
  //   const params = {
  //     mode: 'fastest;car;traffic:enabled',
  //     waypoint0: '37.7397,-121.4252',
  //     waypoint1: '37.9577,-121.2908',
  //     representation: 'display',
  //     routeAttributes: 'summary',
  //   };
  //   routingService.calculateRoute(
  //     params,
  //     (success) => {
  //       const routeLineString = new H.geo.LineString();
  //       success.response.route[0].shape.forEach((point) => {
  //         const [lat, lng] = point.split(',');
  //         routeLineString.pushPoint({
  //           lat: lat,
  //           lng: lng,
  //         });
  //       });
  //       const routePolyline = new H.map.Polyline(routeLineString, {
  //         style: {
  //           lineWidth: 5,
  //         },
  //       });
  //       map.addObject(routePolyline);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  //   console.log(success.response.route[0].summary.distance);
  // };

  render() {
    return (
      <View style>
        <Text>Thank you for riding with our app</Text>
        <Text>Points Earned: {this.state.points} kudos Points</Text>
        <BlueButton label='Return Home' style={{padding: 10}} />
      </View>
    );
  }
}

export default EndRideScreen;
