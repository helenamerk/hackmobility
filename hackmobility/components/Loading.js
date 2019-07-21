import React, {Component} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';
import styles from '../config/styles';

class Loading extends Component {
  state = {};
  render() {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.baseText}>{this.props.extraText}</Text>
        <ActivityIndicator size='large' color='#0000ff' />
      </View>
    );
  }
}

export default Loading;
