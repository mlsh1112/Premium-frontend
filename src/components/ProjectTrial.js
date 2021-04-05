import React, { Component } from 'react';
import { StyleSheet, View, Image,Text,TouchableOpacity,ScrollView } from 'react-native';
import {  Card,IconButton,Colors } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../colors';
import {Button} from '../components';

class ProjectTrial extends Component {
    render() {
        return (
            <View style={styles.position}>
                <Card style={styles.cardStyle}>

                <View style={{margin:20}}>


                    <Text style={{marginBottom:30, color:'red', fontWeight:'bold', fontSize:20}}>
                        7일 체험 중 입니다. 
                    </Text>
                    <Text style={styles.titleStyle}>개념위주의 집중공략으로 수2 마스터하기!</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.subjectStyle}>고등 수학 / 수학</Text>
                    </View>


                
                <View style={styles.eee}>
                    <View style={styles.profile}>
                    <View style={{flexDirection:'row', marginBottom:10 }}>
                        <Image></Image>
                    <Text>이모씨</Text>
                    </View>
                    </View>
                </View>
                
                <View style={styles.eee}>
                    <Text style={styles.headStyle} >인증 방법</Text>
                    <View style={{flexDirection:'row', marginBottom:10 }}>
                    <MaterialCommunityIcons name='checkbox-marked-outline' size={26} color={colors.maincolor}/>
                    <Text style={styles.describeStyle}> 공부 시간 인증</Text>
                    </View>
                </View>

                <View style={styles.eee}>
                    <Text style={styles.headStyle} >보증금</Text>
                    <Text style={styles.describeStyle}>실천보증금 10,000원</Text>
                </View>



                </View>
                </Card>
                <View style={styles.buttonStyle}>
                    <Button onPress={()=>this.props.navigation.navigate('Authentication')}>Today 인증하기</Button>
                </View>
            </View>
        );
    }
}

const styles={
    position:{
        justifyContent: 'center',
        alignItems: "center",
        marginTop:40
      },
      cardStyle:{

        width:'90%',
        height:'85%'
      },
      titleStyle:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:15
  
      },
      subjectStyle:{
        fontWeight:'bold',
        fontSize:15,
        color:'#9FA5C0',
        marginBottom:15
      },
       eee:{
    width: '100%',
    justifyContent: 'space-between',
    borderColor:'#eee',
    borderBottomWidth:2,
    padding: 5,
    marginTop:10

    },

    profile:{
    flexDirection: 'row',
    alignItems: 'center',

    },
    headStyle:{
      fontSize:19,
      fontWeight:'bold',
      color:'#3E5481',
      marginTop:15,
      marginBottom:15
    },
    describeStyle:{
      color:'#9FA5C0',
      fontSize:19,
      marginBottom:30
    },
    buttonStyle:{
        margin:20
      }
}

export default ProjectTrial;
