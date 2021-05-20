import React, { Component, useState, useEffect } from 'react';
import { View,Text,TouchableOpacity,ImageBackground,ScrollView,Image } from 'react-native';
import { getproject,gettutorprojs } from '../../src/Api';
import colors from '../../src/colors'
import {  Card} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import authBtn from '../../assets/authBtn-001.png'
const ProjectAuthCard = ({navigation,project}) => {
    console.log(project)
    var startDate=new Date().getTime() - new Date(project.started_at).getTime();
    var remainDay=Math.floor(startDate / (1000 * 60 * 60 * 24))
    var pastDay=project.experience_period-remainDay
    return( 
            <View style={{flexDirection:'row'}}>
            <Card >
                <View style={cardstyles.card} >
                    <View style={{margin:15, marginLeft:27}}>
                    <Text style={cardstyles.textstyle}>{project.title}</Text>
                    <View style={{marginTop:5}}>
                        {project.experience_period>=remainDay+1?
                        <View style={{flexDirection:'row',margin:2}}>
                        <Text style={cardstyles.dayStyle}>{remainDay+1} </Text>
                        <Text style={cardstyles.dayStyle2}>일차 인증</Text>
                        </View>
                        :
                        <View style={{flexDirection:'row',margin:2}}>
                        <Text style={cardstyles.dayStyle}>{project.experience_period} </Text>
                        <Text style={cardstyles.dayStyle2}>일차 인증</Text>
                        </View>
                        }
                        {
                        pastDay-1<0?
                        <Text style={cardstyles.dayStyle3}>프로젝트가 끝났습니다.</Text>
                        :
                        <Text style={cardstyles.dayStyle3}>남은 인증 {pastDay-1}일</Text>

                    }
                    </View>
                    </View>
                </View>
            </Card>

            <TouchableOpacity style={{}} onPress={()=>{navigation('TutorAuthentication',{project})}}>
                    <Image source={authBtn} style={{width:90,height:100}}></Image>
                    </TouchableOpacity>
            </View>

    )
}

const TutorAuthList = ({navigation}) => {
    const [projects, setProjects] = useState()
    
    useEffect(()=>{

        const callApi= async()=>{
            await gettutorprojs()
            .then(res=>setProjects(res.data))
            .catch(err=>console.log(err))
        }
        callApi()
    },[])
    return (
        <View style={styles.container}>
            {
                projects?
                <ScrollView>
                    {projects.map((project,index)=>{
                            return  <View style={{margin:10, backgroundColor:colors.maincolor,borderRadius:20,marginBottom:20}} key={index}>
                            <ProjectAuthCard navigation={navigation.navigate} project={project}  ></ProjectAuthCard></View>
                        })
                    }
                </ScrollView>
                :
                <Text>진행 중인 프로젝트가 없습니다</Text>
            }
        </View>
    )
}


const styles={
    container:{
        flex:1
    },
    imgStyle:{
        width:180,
        height:180,
        borderRadius:20,
    },
    titleStyle:{
        fontWeight:'bold',
        fontSize:20,
        marginBottom:25

    },
    subStyle:{
        fontWeight:'bold',
        fontSize:18,
        marginBottom:20,
        color:'#2E3E5C'
    },
    dayStyle:{
        fontWeight:'bold',
        fontSize:15,
        color:'#2E3E5C'
    }
}

const cardstyles={
    card:{
        borderWidth:0,
        borderRadius:20,
        width:300,
        height:100,
        flexDirection:'row'
    },
    textstyle:{
        fontWeight:'bold',
        fontSize:20,
        margin:2
    },
    dayStyle:{
        fontWeight:'bold',
        fontSize:17,
        color:"red"
    },
    dayStyle2:{
        fontWeight:'bold',
        fontSize:17,
    },
    dayStyle3:{
        fontSize:15,
        color:"#9E9E9E",
        margin:2
    }

    
}
export default TutorAuthList;
