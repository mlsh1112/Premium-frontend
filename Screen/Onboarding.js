import React, { Component } from 'react';
import {Button} from '../src/components';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
  } from 'react-native';
import icon from '../assets/icon2.png'

class Onboarding extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textposition}><Image source={icon} style={styles.iconstyle}></Image></View>
                <Button  onPress={() => this.props.navigation.navigate("AuthLoading")}>Get Started</Button>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
    },
    textposition:{
        flexDirection: 'row',
        height: 500,
        marginTop: 0,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    iconstyle:{
        width:"90%",
        height:"90%"
    },

  });

export default Onboarding;
