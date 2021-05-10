import React, { Component,useEffect,useState } from 'react';
import colors from '../../src/colors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    TextInput,
    Keyboard,
  } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {Button} from '../../src/components'
import { gettutees } from '../../src/Api';

function TuteeListComponent({tutee,navigation}){
    return(
        <View style={styles.tuteeBarStyle}>
            <Icons name='face' size={30} style={{marginLeft:'8%'}} ></Icons>
            <Text style={styles.tuteenameStyle}>{tutee.name}</Text>
            <TouchableOpacity style={styles.tuteeBtnPosition} onPress={()=>{navigation.push('TutorAuthCheck',tutee)}}>
                <View>
                    <Text style={styles.BtntextStyle}>인증 확인</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const TutorAuthentication = ({navigation,route }) => {
    const [projectlist,setProjectlist] = useState();
    const [tutees,setTutees] = useState([
        {id: 0,name: "LEE", auth:"1+1=2"},
        {id: 1,name: "KIM", auth:"5*5=25"},
      ]);
    const [fin,setFin]=useState(true)
    const [project, setProject]=useState(route.params.project)
    const handleSubmitAuthenticatoin = () => {
        Keyboard.dismiss();
    }
    console.log(project.id)

    useEffect(()=>{
        const callApi= async()=>{
            await gettutees({
                "project_id":project.id
            })
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
        }
        
        callApi()
    },[])
    return (
        <View style={styles.container}>
            <View style={{flexDirection:'row',}}>
                <Text style={styles.prjtitlestlye}>{route.params.project.title}</Text>
            </View>

            <View style={{flexDirection:'row',borderColor:'#D0DBEA',
                            borderBottomWidth:2,width:'80%',marginBottom:'5%',
                            justifyContent:'center',
                            alignItems: 'center',}}>
                                
                <View style={styles.precentPosition}>
                    <Text style={styles.presentTextStyle}>현재 진행률</Text>
                    <Text style={styles.percentStyle}>30%</Text>
                </View>

                <View style={styles.precentPosition}>
                    <Text style={styles.authTextStyle}>인증 진행률</Text>
                    <Text style={styles.percentStyle}>30%</Text>
                </View>
            </View >


            <View style={{marginRight:'55%', marginBottom:'5%'}}>
            <Text style={styles.authtuteeStyle}>인증 한 튜티</Text>
            </View>
                {fin ? 
                        <ScrollView style={{marginLeft:'20%', width:'100%'}}>
                            {tutees.map((tutee,index)=>{
                                    return <TuteeListComponent 
                                    tutee={tutee}
                                    navigation={navigation}
                                    key={index}
                                    />
                                    })}
                        </ScrollView>
                        :
                        <View >
                            <View style={{marginTop:100,marginBottom:195}}>
                            <Text style={styles.paytxtStyle}>이 프로젝트는 완료된 프로젝트 입니다!</Text>
                            </View>
                        <Button onPress={()=>{
                                navigation.push('AuthPayBack', {project})}}
                                style={{width:'100%'}}>
                                    <Text>보증금 환급 받기!</Text>
                        </Button>
                        </View>   
                }
            </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        width: "100%",
        justifyContent:'center',
        alignItems: 'center',
        margin:'3%',
    },
    pickerstyle:{
        width: "90%",
        marginTop:'1%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingRight: 30,
        color:"black"
    },
    precentPosition:{
        flex:1,
        margin: '10%',
        justifyContent:'center',
        alignItems: 'center',
        height:'25%'
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
        width:'80%',
        height:'60%',
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
        marginLeft:'35%',
        backgroundColor:'#1FCC79',
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
        fontSize:27,
        fontWeight:'bold',
    }
  });

export default TutorAuthentication;
