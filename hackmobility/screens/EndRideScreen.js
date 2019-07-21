import * as React from 'react';
import {Text, View, Alert} from 'react-native';
import {BlueButton} from '../components/Button';
import {getUserPoints} from '../requests';
import colors from '../config/colors';
import {endTrip} from '../requests';
import Storage from '../Storage';
import styles from '../config/styles';

class EndRideScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      header: () => null,
      /* These values are used instead of the shared configuration! */
    };
  };

  state = {
    loading: true,
    data: {},
  };
  handleTripComplete = () => {
    this.props.navigation.navigate('Home');
  };

  findCoordinates = async () => {
    return navigator.geolocation.getCurrentPosition(
      (location) => {
        return location;
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  };

  findCoordinates = (user_name) => {
    this.setState({loading: true});
    navigator.geolocation.getCurrentPosition(
      (location) => {
        console.log(location);
        this.setState({location: location});
        endTrip(location, user_name).then((res) => {
          res.emission = this.calculateEmissions(res.distance);
          res.time = this.msToTime(res.time);
          this.setState({loading: !res.result});
          this.setState({data: res});
          console.log(res);
        });
      },
      (error) => Alert.alert(error.message),
      {enableHighAccuracy: false, timeout: 0, maximumAge: 1000}
    );
  };

  msToTime = (s) => {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return hrs + ':' + mins + ':' + secs + '.' + ms;
  };

  componentDidMount = () => {
    console.log('?');
    Storage.getItem('user_name')
      .then((user_name) => {
        console.log(user_name);
        this.findCoordinates(user_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  calculateEmissions = (meter) => {
    const ratio = 251; // 251 gram CO2 per km
    const users = this.props.navigation.getParam('users');
    return ((ratio * meter) / 1000) * (users.length - 1);
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
      <View
        style={[
          styles.container_margin,
          {alignItems: 'flex-start', alignContent: 'flex-start'},
        ]}
      >
        <Text style={styles.title}>Ride Summary</Text>
        {!this.state.loading && (
          <>
            <Text style={styles.subtitleText}>
              Distance Driven (km): {this.state.data.distance / 1000} redeembale
              points!
            </Text>
            <Text style={styles.subtitleText}>
              Time of Journey: {this.state.data.time}.
            </Text>
            <Text style={styles.subtitleText}>
              Points Earned: {this.state.data.points} redeemable points!
            </Text>
            <Text style={styles.subtitleText}>
              You saved {this.state.data.emission} grams of CO2 by carpooling!
            </Text>
            <BlueButton
              onPress={this.handleTripComplete}
              label='Return Home'
              style={{padding: 10}}
            />
          </>
        )}
      </View>
    );
  }
}

export default EndRideScreen;
