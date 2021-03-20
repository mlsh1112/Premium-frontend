import React, { Component } from 'react';
import {Button} from '../src/components'
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
  } from 'react-native';


class Onboarding extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textposition}><Text style={styles.textstyle}>공부 하자</Text></View>
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
    textstyle:{
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 50,
        color: '#2E3E5C'
    },

  });

export default Onboarding;
