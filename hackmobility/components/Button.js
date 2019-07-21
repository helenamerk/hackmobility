import * as React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from '../config/styles';

export class BlueButton extends React.Component {
  render() {
    const {label, onPress} = this.props;
    return (
      <TouchableOpacity style={styles.buttonStyleContainer} onPress={onPress}>
        <Text style={styles.buttonStyleText}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

export class InverseButton extends React.Component {
  render() {
    const {label, onPress} = this.props;
    return (
      <TouchableOpacity
        style={styles.inverseButtonStyleContainer}
        onPress={onPress}
      >
        <Text style={styles.inverseButtonStyleText}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

export class PreviewButton extends React.Component {
  render() {
    const limit = this.props.limit;
    if (this.props.story.length < limit && this.props.story.length > 0) {
      console.log(this.props.story.length);
      return <BlueButton label='Preview' onPress={this.props.onPress} />;
    } else {
      return null;
    }
  }
}
