import React, {Component} from 'react';
import {View, Text} from 'react-native';
import styles from '../config/styles';
import {Video} from 'expo-av';

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
          style={{width: '100%', height: '30%'}}
        />
      </View>
    );
  }
}

export default Loading;
