import React, { Component, useState, useEffect } from 'react';
import { View,Text,TouchableOpacity,ImageBackground } from 'react-native';
import { getattendances } from '../../src/Api';
import AsyncStorage from '@react-native-community/async-storage';
import colors from '../../src/colors'


const ProjectAuthCard = ({navigation,project}) => {
     useEffect(()=>{
         console.log("여긴 카드")
         console.log({project})
     })
    return(
        <View style={{width:350,margin:10,backgroundColor:colors.subcolor, borderRadius:10}}>
        <TouchableOpacity onPress={()=>{navigation('TuteeAuthdetail',{project})}}>
                <View style={{margin:10}}>
                <Text style={styles.titleStyle}>{project.project.title}</Text>
                <Text style={styles.subStyle}>고등 수학 / 수학</Text>
                <Text style={styles.dayStyle}>{project.experience_period} DAYS</Text>
                </View>
        </TouchableOpacity>
    </View>
    )
}

const TuteeAuthList = ({navigation}) => {
    const [projects, setProjects] = useState();
    const [user,setUser]=useState()

    useEffect(() => {
            
        const getData = async() =>{
            await AsyncStorage.getItem('userinfo')
            .then(res=>{
                setUser(JSON.parse(res))
            })
            .catch(err=>console.log(err))
        }

        getData()
        const callApi = async() =>{
            await getattendances()
            .then(res=>{{console.log(JSON.stringify(res.data)+"여긴 res")
                        setProjects(res.data)
        }})
            .catch(err=>{
                console.log("여긴 에러")
                console.log(err)})
        }
        callApi()
    },[]);

    return (
        <View style={styles.container}>
            {
                projects?
                <View style={{}}>
                    {projects.map((project,index)=>{
                            return  <ProjectAuthCard navigation={navigation.navigate} project={project} key={index} ></ProjectAuthCard>
                        })
                    }
                </View>
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
export default TuteeAuthList;
