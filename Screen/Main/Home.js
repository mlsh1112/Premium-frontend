import React, { Component } from 'react';
import RNPickerSelect from 'react-native-picker-select';
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
                <Text style={styles.textposition}>따 숲</Text>
                <RNPickerSelect 
                    onValueChange={(value) => console.log(value)}
                    items={[
                        { label: '국어', value: 'korean' },
                        { label: '영어', value: 'english' },
                        { label: '수학', value: 'math' },
                    ]}
                />
                <ScrollView >
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
        marginTop:70,
        marginLeft:50,
        fontSize:30,
        fontWeight:'bold'
    },
    pickerposition:{
        margin:10
    },
    welcome: {
        backgroundColor: 'orange',
        margin: 10,
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 70,
      }
  });

export default Home;
