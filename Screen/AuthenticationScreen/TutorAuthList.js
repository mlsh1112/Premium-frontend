import React, { Component, useState, useEffect } from 'react';
import { View,Text,TouchableOpacity,ImageBackground } from 'react-native';
import { getproject } from '../../src/Api';
import colors from '../../src/colors'
const callApi = async() =>{
    getproject(userID)
    .then(res=>res.json())
    .then(json=>json.data)
    .catch(err=>console.log(err))
}

const ProjectAuthCard = ({navigation,project}) => {
    
    return(
        <View style={{width:350,margin:10,backgroundColor:colors.subcolor, borderRadius:10}}>
        <TouchableOpacity onPress={()=>{navigation('TutorAuthentication')}}>
                <View style={{margin:10}}>
                <Text style={styles.titleStyle}>{project.title}</Text>
                <Text style={styles.subStyle}>고등 수학 / 수학</Text>
                <Text style={styles.dayStyle}>60 DAYS</Text>
                </View>
        </TouchableOpacity>
    </View>
    )
}

const TutorAuthList = ({navigation}) => {
    const [projects, setProjects] = useState([
        {id:0,title: "수학2 마스터하기", info:"반복학습을 통한 수학2 마스터하기",fin:true,experience:true},
        {id:1,title: "비문학 마스터하기", info:"회독을 통한 비문학 마스터하기",fin:false,experience:false},
        {id:2,title: "국사 마스터하기", info:"중요파트 집중을 통한 국사 마스터하기",fin:true,experience:false}
          
    ]);

    useEffect(() => {
        //const project_list=await callApi()
        //setProjects(project_list)
    }, []);

    return (
        <View style={styles.container}>
            {
                projects?
                <View style={{}}>
                    {projects.map((project,index)=>{
                            return  <ProjectAuthCard navigation={navigation.navigate} project={project} ></ProjectAuthCard>
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
export default TutorAuthList;
