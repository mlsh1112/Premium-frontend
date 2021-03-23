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
                <View style={styles.pickerstyle}>
                    <RNPickerSelect 
                        placeholder={{ label: "과목", value: null }}
                        onValueChange={(value) => console.log(value)}
                        useNativeAndroidPickerStyle={false}
                        items={[
                            { label: '전체', value: 'all' },
                            { label: '국어', value: 'korean' },
                            { label: '영어', value: 'english' },
                            { label: '수학', value: 'math' },
                       ]}
                /></View>
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
        marginLeft:30,
        fontSize:30,
        fontWeight:'bold'
    },
    pickerstyle:{
        margin:30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingRight: 30,
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
