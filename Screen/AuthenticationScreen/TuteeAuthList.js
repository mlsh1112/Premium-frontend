import React, { Component, useState, useEffect } from 'react';
import { View,Text,TouchableOpacity,ImageBackground,Image } from 'react-native';
import { getattendances } from '../../src/Api';
import AsyncStorage from '@react-native-community/async-storage';
import { Card } from 'react-native-paper';
import colors from '../../src/colors'
import TodayProject from '../../src/components/TodayProjectHome'
import authBtn from '../../assets/authBtn-001.png'
import { ScrollView } from 'react-native';

const ProjectAuthCard = ({navigation,project}) => {
    console.log(project)
    return( 
            <View style={{flexDirection:'row'}}>
            <Card >
                <View style={cardstyles.card} >
                    <View style={{margin:15, marginLeft:25}}>
                    <Text style={cardstyles.textstyle}>{project.project.title}</Text>
                    <View style={{flexDirection:'row',margin:2}}>
                    <Text style={cardstyles.dayStyle}>{} </Text>
                    <Text style={cardstyles.dayStyle2}>일차 인증</Text>
                    </View>
                    <Text style={cardstyles.dayStyle3}>남은 인증 {}일</Text>
                    </View>
                </View>
            </Card>

            <TouchableOpacity style={{}} onPress={()=>{navigation('TuteeAuthdetail',{project})}}>
                    <Image source={authBtn} style={{width:90,height:100}}></Image>
                    </TouchableOpacity>
            </View>

    )
}

const TuteeAuthList = ({navigation}) => {
    const [projects, setProjects] = useState();
    const [user,setUser]=useState();

    useEffect(() => {
            
        const getData = async() =>{
            await AsyncStorage.getItem('userinfo')
            .then(res=>{
                setUser(JSON.parse(res))
            })
            .catch(err=>console.log(err))

            await AsyncStorage.getItem('projects')
            .then(res=>setProjects(JSON.parse(res)))
            .catch(err=>console.log(err))
        }

        getData()
        const callApi = async() =>{
            await getattendances()
            .then(res=>setProjects(res.data))
            .catch(err=>{console.log(err)})
        }
        //callApi()
    },[]);
    return (
        <View style={styles.container}>
            {
                projects?
                <ScrollView>
                    {projects.map((project,index)=>{
                            console.log(project)
                            return  <View style={{margin:10, backgroundColor:colors.maincolor,borderRadius:20,marginBottom:20}}>
                                <ProjectAuthCard navigation={navigation.navigate} project={project} tutee={project.tutee} key={index} ></ProjectAuthCard>
                                </View>
                            /*<View style={{margin:10, backgroundColor:colors.maincolor,borderRadius:20}}>
                                            <TodayProject
                                        navigation={navigation}
                                        data={project.project}
                                        startDay={project.created_at}
                                        key={index}
                                        /></View>*/
                            
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
        fontSize:19,
        margin:2
    },
    dayStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:"red"
    },
    dayStyle2:{
        fontWeight:'bold',
        fontSize:20,
    },
    dayStyle3:{
        fontSize:15,
        color:"#9E9E9E",
        margin:2
    }

    
}
export default TuteeAuthList;
