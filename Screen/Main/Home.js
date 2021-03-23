import React, { Component } from 'react';
import colors from '../../src/colors';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
  } from 'react-native';


class Home extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textposition}>따숲</Text>
                <ScrollView style={styles.textposition}>
                    <Text style={styles.welcome}>Welcome to React Native</Text>
                    <Text style={styles.welcome}>Welcome to React Native</Text>
                    <Text style={styles.welcome}>Welcome to React Native</Text>
                </ScrollView>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent:'center',
    },
    textposition:{
        flex:1,
        position: 'absolute',
        left: '27%',
        top: '20%'
    },
    textstyle:{
        flex:1,
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 50,
        color: '#2E3E5C',
        margin:20,
    },
    welcome: {
        flex: 1,
        margin: 20,
        backgroundColor: 'orange',
        margin: 10,
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 70,
      }
  });

export default Home;
