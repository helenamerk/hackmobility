import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../config/styles';
import {Video} from 'expo-av';
import colors from '../config/colors';

class Loading extends Component {
  state = {};
  render() {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.baseText}>{this.props.extraText}</Text>
        <Video
          source={require('../assets/loading.mp4')}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode='cover'
          shouldPlay
          isLooping
          style={{
            width: '100%',
            height: '40%',
            bottom: 0,
            position: 'absolute',
          }}
        />
      </View>
    );
  }
}

export default Loading;
