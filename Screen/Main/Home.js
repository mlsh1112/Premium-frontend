import React, { Component } from 'react';
import colors from '../src/colors';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
  } from 'react-native';


class Home extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textposition}>
                    <Text style={styles.textstyle}>따 숲</Text>
                    <Text style={styles.textstyle}>HOME</Text>
                </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
    },
    textposition:{
        position: 'absolute',
        left: '27%',
        top: '20%'
    },
    textstyle:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 50,
        color: '#2E3E5C'
    },
    buttonposition:{
        position: 'absolute',
        width: 327,
        height: 56,
        left: '10%',
        top: '75%',
        backgroundColor: colors.maincolor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 32
    },
    buttonstyle:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
  });

export default Home;
