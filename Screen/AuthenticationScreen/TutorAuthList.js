import React, { Component, useState, useEffect } from 'react';
import { View,Text,TouchableOpacity,ImageBackground,ScrollView } from 'react-native';
import { getproject,gettutorprojs } from '../../src/Api';
import colors from '../../src/colors'
import {  Card} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

const ProjectAuthCard = ({navigation,project}) => {
    console.log(project)
    return(
        <View style={{marginBottom:4,borderRadius:10}}>
        <Card style={{width:350,margin:10, borderRadius:10,backgroundColor:colors.subcolor}}>
        <TouchableOpacity onPress={()=>{navigation('TutorAuthentication',{project})}}>
                <View style={{margin:10}}>
                <Text style={styles.titleStyle}>{project.title}</Text>
                <Text style={styles.subStyle}>고등 수학 / 수학</Text>
                <Text style={styles.dayStyle}>{project.experience_period} DAYS</Text>
                </View>
        </TouchableOpacity>
    </Card>
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
                            return  <ProjectAuthCard navigation={navigation.navigate} project={project} key={index} ></ProjectAuthCard>
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
export default TutorAuthList;
