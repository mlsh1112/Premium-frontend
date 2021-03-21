import React, {Component, useState,createRef} from 'react';
 import {Button} from '../src/components'
 import axios from 'axios'
 import {
   SafeAreaView,
   StyleSheet,
   ScrollView,
   View,
   Text,
   Image,
   StatusBar,
   TextInput,
   TouchableOpacity,  
 } from 'react-native';


class SignUpScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
          email: '',
          password: '',
          password_confirmation: '',
          name:'',
          phonenumber:'',
          user_type:'',
          error: '',
          loading: false
        };
    }
    render() {
        const { email, password, password_confirmation, name, phonenumber,user_type,error, loading } = this.state;
        return (
            <View style={form}>
          <View style={section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({ email })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="password"
              label="Password"
              value={password}
              onChangeText={password => this.setState({ password })}
            />
          </View>

          <View style={section}>
            <Input
              secureTextEntry
              placeholder="confirm password"
              label="Confirm Password"
              value={password_confirmation}
              onChangeText={password_confirmation => this.setState({ password_confirmation })}
            />
          </View>

          <View style={section}>
            <Input
              placeholder="name"
              label="Name"
              value={name}
              onChangeText={email => this.setState({ name })}
            />
          </View>

        </View>
        );
    }
}

const styles = {
    form: {
      width: '100%',
      borderTopWidth: 1,
      borderColor: '#ddd',
    },
    section: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      backgroundColor: '#fff',
      borderColor: '#ddd',
    },
  };

export default SignUpScreen;
