import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {InverseButton} from '../components/Button';
import styles from '../config/styles';
import {getUserPoints, redeemPoints} from '../requests';
import Storage from '../Storage';
import {TouchableOpacity} from 'react-native-gesture-handler';

class Rewards extends React.Component {
  state = {
    user_name: '',
    user_points: '',
    loading: true,
  };
  componentDidMount = () => {
    Storage.getItem('user_name').then((user_name) => {
      this.setState({user_name: user_name});

      getUserPoints(user_name).then((user_points) => {
        this.setState({user_points: user_points});
        this.setState({loading: false});
      });
    });
  };

  redeemUserPoints = (vendor) => {
    console.log('Redeeming points');
    redeemPoints(this.state.user_name, vendor).then((newScore) => {
      this.setState({user_points: newScore});
    });
  };
  render() {
    const {navigation} = this.props;

    return (
      <View style={styles.container_margin}>
        <View
          style={{
            flexDirection: 'row',
            flexDirection: 'row',
            justifyContent: 'center',
            top: 100,
          }}
        >
          <Text style={styles.title}>
            Current Reward Points:
            <Text style={styles.impressiveText}>{this.state.user_points}</Text>
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignContent: 'space-evenly',
            justifyContent: 'space-evenly',
            width: '100%',
          }}
        >
          <TouchableOpacity onPress={() => this.redeemUserPoints('shell')}>
            <Image
              style={{width: 55, height: 55}}
              source={require('../assets/redeem/shell.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.redeemUserPoints('starbucks')}>
            <Image
              style={{width: 55, height: 55}}
              source={require('../assets/redeem/starbucks.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.redeemUserPoints('caltrain')}>
            <Image
              style={{width: 55, height: 55}}
              source={require('../assets/redeem/caltrain.jpg')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.redeemUserPoints('bird')}>
            <Image
              style={{width: 55, height: 55}}
              source={require('../assets/redeem/bird.png')}
            />
          </TouchableOpacity>
        </View>
        <InverseButton
          onPress={() => this.props.navigation.goBack()}
          label='Dismiss'
        />
      </View>
    );
  }
}

export default Rewards;
