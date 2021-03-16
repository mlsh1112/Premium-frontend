/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import Onboarding from './Screen/Onboarding';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


class App extends Component {

  render(){
  return (
    <View style={styles.container}>
      <Onboarding/>
    </View>
  );
  }
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
});


export default App;
