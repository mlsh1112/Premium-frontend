/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Image,
  StatusBar,
} from 'react-native';

class Cat extends Component{
  render () {
    let catimg=''

    if(this.props.type=='one'){
      catimg=require('./assets/cat.jpeg');
    }
    else if(this.props.type=='two'){
      catimg=require('./assets/cat2.png');
    }

    return(
      <View>
      <Image source={catimg}style={{height:200, width:300}} />
      </View>
    );
  }
}

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      address:''
    }
  }
  writeAddress=()=>{
    this.setState({
      address:'경기도 수원시'
    })
  }
  resetAddress=()=>{
    this.setState({
      address:''
    })
  }

  render(){
  return (
    <View style={styles.container}>
      <Text style={styles.textstyle}>Hello world!</Text>
      <Cat type='one' />
      <Cat type='two'/>
      <Text>{this.state.address}</Text>
      <Button title={'Write my address'} onPress={this.writeAddress}/>
      <Button title={'Reset my address'} onPress={this.resetAddress}/>
    </View>
  );
  }
};

const styles = StyleSheet.create({
  container : {
      flex : 1,
      justifyContent:'center',
      alignItems:'center'
  },
  textstyle:{
    fontSize:20,
    fontWeight:'bold'
  }
});

export default App;
