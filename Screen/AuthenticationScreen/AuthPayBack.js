import React, { Component,useState,Animated } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
}from 'react-native';
import colors from '../../src/colors'
import {Button} from '../../src/components'
const AuthPay=({project})=>{
    const [rate,setRate]=useState([
            {id:0,title:'Auhrate',rate:30},
            {id:1,title:'Progressrate',rate:100}
        ])
    const [ratebar,setRatebar]=useState([
        {id:0,title:'Auhrate',rate:310*(rate[0].rate/100)},
        {id:1,title:'Progressrate',rate:310*(rate[1].rate/100)}
    ]);
    function handleSubmit(){
        console.log('press')
        alert('보증금 환급 신청이 완료되었습니다.')
    }

    return(
    <View style={styles.container}>
        <View style={{borderColor:'#9FA5C0',
                            borderBottomWidth:2,width:'100%',marginBottom:'5%'}}>
                <Text style={styles.projecttextStyle}> 보증금 환급받기</Text>
        </View>
        
        <View style={{margin:20}}>
            
            <View style={{marginBottom:30}}>
                    <Text> 김모씨</Text>
            </View>

            <View>
                <Text>고등 수학 정복하기</Text>
                <Text></Text>
            </View>
            <View >
                <Text>프로젝트 인증 기한이 끝났습니다 !</Text>
                 <Text>고생하셨습니다 👏</Text>
            </View>
            <View style={{flexDirection:'row',marginBottom:'5%',
                            justifyContent:'center',alignItems: 'center',}}>
                <View style={styles.precentPosition}>
                    <Text style={styles.presentTextStyle}>현재 진행률</Text>
                    <Text style={styles.percentStyle}>{rate[1].rate}%</Text>
                </View>

                <View style={styles.precentPosition}>
                    <Text style={styles.authTextStyle}>인증 진행률</Text>
                    <Text style={styles.percentStyle}>{rate[0].rate}%</Text>
                </View>
                
            </View >
            <View >
                <View style={{flexDirection:'row', marginBottom:10}}>
                    <View style={{borderColor:colors.maincolor,
                                borderBottomWidth:15,borderRadius:10,
                                width:ratebar[1].rate,}}>
                    </View>
                    <Text style={styles.presentBarTextStyle}>{rate[1].rate}%</Text>
                </View>
                <View style={{flexDirection:'row', marginBottom:20}}>
                    <View style={{borderColor:'#FF6464',
                                borderBottomWidth:15,borderRadius:10,
                                width:ratebar[0].rate}}></View>
                    <Text style={styles.authBarTextStyle}>{rate[0].rate}%</Text>
                </View>
            </View>

            <Button >보증금 환급 신청</Button>
        </View>

        
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        
    },
    projecttextStyle:{
        fontSize:20,
        fontWeight:'bold',
        color:'#3E5481',
        right:'0%',
        margin:'5%',
        marginTop:'15%',
    },
    precentPosition:{
        flex:1,
        margin: '10%',
        justifyContent:'center',
        alignItems: 'center',
    },
    presentTextStyle:{
        fontWeight:'bold',
        fontSize:18,
        color:colors.maincolor,
        marginBottom:'20%'
    },authTextStyle:{
        fontWeight:'bold',
        fontSize:18,
        color:'#FF6464',
        marginBottom:'20%'

    },
    percentStyle:{
        fontWeight:'bold',
        color:'#9FA5C0',
        fontSize:20
    },
    presentBarTextStyle:{
        fontWeight:'bold',
        fontSize:15,
        color:colors.maincolor,
        marginLeft:10
    },
    authBarTextStyle:{
        fontWeight:'bold',
        fontSize:15,
        color:'#FF6464',
        marginLeft:10
    },
  });

export default AuthPay;
