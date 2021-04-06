import React, { Component,useState } from 'react';
import colors from '../../src/colors';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    TextInput,
    Keyboard,
  } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../src/components';


const TutorAuthCheck = ({}) => {
    const [tutee,settutee] = useState([
        {id: 1,name: "LEE", info:"반복학습을 통한 수학2 마스터하기"},
      ]);
    return (
        <View style={styles.container}>
            <View style={styles.tuteeBarStyle}>
            <Icons name='face' size={30}></Icons>
            <Text style={styles.tuteenameStyle}>{tutee[0].name}</Text>
        </View>
        <View style={styles.tuteeBarStyle}>
            <Text style={styles.textStyle}>Today 인증 내용 👍</Text>
        </View>
        <View style={styles.fileboxStyle}>

        </View>

        <Button >Today 인증 확인 ✌️</Button>
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        width: "100%",
        height:'100%',
        alignItems: 'center',
        margin:'0%',
        marginTop:'5%'
    },
    tuteeBarStyle:{
        width:'80%',
        alignItems: 'center',
        flexDirection:'row',
        margin:'3%'
    },
    tuteenameStyle:{
        marginLeft:'5%',
        fontSize:20,
        fontWeight:'bold',
    },
    textStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:'#3E5481',
    },
    fileboxStyle:{
        backgroundColor:'#D0DBEA',
        width:'90%',
        height:'50%',
        marginBottom:'30%',
        alignItems: 'center',
        borderRadius:20,
    }
  });

export default TutorAuthCheck;
