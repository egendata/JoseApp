import React from 'react';
import {
  Button
} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <>
        <Button
          title="JWE"
          testID="navigate-jwe-btn"
          onPress={() => navigate('JWE')}
        />
        <Button
          title="Signing"
          onPress={() => navigate('Signing')}
        />
      </>
    );
  }
}