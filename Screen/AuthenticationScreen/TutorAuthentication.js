import React, { Component,useEffect,useState } from 'react';
import colors from '../../src/colors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    Dimensions
  } from 'react-native';
import {Button} from '../../src/components'
import { gettutees } from '../../src/Api';


const moment = require("moment");

const TutorAuthentication = ({navigation,route }) => {
    const [tutees,setTutees] = useState();
    const [fin,setFin]=useState(true)
    const project=route.params.project
    const startDate = moment(project.started_at)
    const now = moment()
    const remainDay = now.diff(startDate,'days') //시작하는 날짜가 0일차
    var pastDay = project.duration
    // var pastDay = 0
    if(remainDay >= 0){
        pastDay = project.duration - remainDay
    }
    console.log(project)
    useEffect(()=>{    
            gettutees({
                "project_id":project.id
            })
            .then(res=>{
                const filteredauth = res.data.filter((auth) => {
                    return now.diff(auth.created_at,'days') === 0
                })
                setTutees(filteredauth)
            }).catch(err=>{
                console.log('--------------get tutees 에러 ---------------')
                console.log(err)
            })
    },[])

    function TuteeListComponent({tutee,navigation}){
        const tuteeinfo=tutee.target
        return(
            <View style={styles.tuteeBarStyle}>
                <Icons name='face' size={30} style={{marginLeft:'8%'}} ></Icons>
                <Text style={styles.tuteenameStyle}>{tuteeinfo.name}</Text>
                <TouchableOpacity style={styles.tuteeBtnPosition} onPress={()=>{navigation.push('TutorAuthCheck',tutee)}}>
                    <View>
                        <Text style={styles.BtntextStyle}>인증 확인</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.prjtitlestlye}>{route.params.project.title}</Text>
            </View>
            <View style={styles.authratestyle}>        
                <View style={styles.precentPosition}>
                    <Text style={styles.presentTextStyle}>현재 진행률</Text>
                    <Text style={styles.percentStyle}>{remainDay +1} / {project.duration}</Text>
                </View>
                <View style={styles.precentPosition}>
                    <Text style={styles.authTextStyle}>인증 진행률</Text>
                    <Text style={styles.percentStyle}>30%</Text>
                </View>
            </View >

            <View style={{marginRight:'55%', marginBottom:'5%'}}>
                <Text style={styles.authtuteeStyle}>   오늘 인증 한 튜티</Text>
            </View>
            {   pastDay > 0 
                    ?   (<ScrollView>
                        { tutees
                            ? (<View style={styles.tuteelistview}>
                                    {tutees.map((tutee,index)=>{
                                            return <TuteeListComponent tutee={tutee} navigation={navigation} key={index}/>   
                                        })
                                    }
                              </View>)
                            : null
                        }    
                        </ScrollView>)
                    :   (<View>
                            <View style={{marginTop:100,marginBottom:195}}>
                                <Text style={styles.paytxtStyle}>이 프로젝트는 완료된 프로젝트 입니다!</Text>
                            </View>
                            <Button onPress={()=>{navigation.push('AuthPayBack', {project})}} style={{width:'100%'}}>
                                <Text>보증금 환급 받기!</Text>
                            </Button>
                        </View>)   
            }
        </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent:'center',
        alignItems: 'center',
        margin:'3%',
    },
    precentPosition:{
        flex:1,
        margin: 20,
        justifyContent:'center',
        alignItems: 'center',
        height:'100%',
    },
    presentTextStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:colors.maincolor,
        marginBottom:'20%'
    },
    authTextStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:'#FF6464',
        marginBottom:'20%'
    },
    percentStyle:{
        fontWeight:'bold',
        color:'#9FA5C0',
        fontSize:25
    },
    authtuteeStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:'#9FA5C0',
    },
    tuteeBarStyle:{
        backgroundColor:'#D0DBEA',
        width:'100%',
        height:50,
        marginBottom:'5%',
        alignItems: 'center',
        borderRadius:20,
        flexDirection:'row'
    },
    tuteenameStyle:{
        marginLeft:'5%',
        fontSize:20,
    },
    tuteeBtnPosition:{
        marginLeft:'28%',
        backgroundColor:colors.maincolor,
        width:'30%',
        height:'60%',
        borderRadius:20,
        alignItems: 'center',
        justifyContent:'center',
    },
    BtntextStyle:{
        color:'white',
        fontWeight:'bold',
        fontSize:17
    },
    paytxtStyle:{
        fontSize:20,
        fontWeight:'bold',
    },
    prjtitlestlye:{
        marginTop:10,
        fontSize:24,
        fontWeight:'bold',
    },
    authratestyle:{
        flexDirection:'row',
        borderColor:'#D0DBEA',
        borderBottomWidth:2,marginBottom:'5%',
        justifyContent:'center',
        alignItems: 'center',
        width:'100%',
        height:'20%'
    },
    tuteelistview: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width: (Dimensions.get('window').width * 0.9)
    }
  });

export default TutorAuthentication;
