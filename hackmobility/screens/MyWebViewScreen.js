import * as React from 'react';
import {WebView, Button} from 'react-native';

class MyWebViewScreen extends React.Component {
  static navigationOptions = ({navigation, navigationOptions}) => {
    const {params} = navigation.state;

    return {
      title: params ? params.viewTitle : 'Authorize Vehicle Flow',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
      headerRight: (
        <Button
          onPress={() => navigation.navigate('Home')}
          title='Done'
          color='#000'
        />
      ),
    };
  };

  render() {
    const {navigation} = this.props;
    const url = navigation.getParam('url', 'NO-URL');

    return <WebView source={{uri: url}} style={{marginTop: 0}} />;
  }
}

export default MyWebViewScreen;
