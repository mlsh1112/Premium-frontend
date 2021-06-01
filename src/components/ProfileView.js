import React, { useState,useEffect } from 'react';
import {  View, Image,Text,TouchableOpacity,ScrollView,Alert } from 'react-native';
import {  Card,IconButton,Colors } from 'react-native-paper';
import cat from '../../assets/cat2.png'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../components'
import ProjectMini from './ProjectMini'
import Like from './Like';
import {getproject} from '../Api'

function ProfileView({ navigation,route }){
    const project = route.params.latestpr
    const [latestpr,setLatestpr]=useState()
    const [numoflike,setNumoflike]=useState(0)

    console.log(project.tutor)
    useEffect(()=>{
        getproject(project.id).then(res => {
            setLatestpr(res.data)
        }).catch(e => {
            console.log(e)
        });    
    },[])
    return(
        <View>
            <Card style={styles.cardStyle}>
                <View style={styles.topPosition}>
                    <View style={styles.profilePosition}> 
                    {
                        project.tutor.image!==" "?
                        <Image source={{uri:project.tutor.image}} style={styles.imgStyle}></Image>
                            :
                        <Image source={cat} style={styles.imgStyle}></Image>
                    }
                        <View style={{flexDirection : 'row',alignItems: 'center',justifyContent:'space-between',width:'100%'}}>
                            <View >
                                <View style={{flexDirection:'row',marginBottom:10}}>
                                    <Text style={styles.nameStyle1}>{project.tutor.type}  </Text>
                                    <Text style={styles.nameStyle2}> {project.tutor.name}</Text>
                                </View>

                                <View style={{flexDirection:'row',marginBottom:10}}>
                                    <Icons name='school' size={20} color="#9FA5C0"></Icons>
                                    <Text style={styles.schoolStyle}>아주대학교</Text>
                                </View>
                            </View>
                            <View>
                                {latestpr !== undefined ? <Like tutor={latestpr.tutor} likecondition={false} likeid={0} setNumoflike={setNumoflike}/> : <></>}
                            </View>
                        </View>
                        
                    </View>
                </View>

            <View style={styles.bottomPosition}></View>    
            
            <View style={styles.projectPosition}>
                <Text style={styles.projectText}>선택하신 프로젝트</Text>
                <View style={{marginVertical:30,width: '100%',height: '90%'}}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator = {true}
                        style={styles.projectScroll}>
                            {latestpr !==undefined ? <ProjectMini navigation={navigation} project={latestpr}></ProjectMini> : <></>}
                    </ScrollView>
                </View>
            </View>
        </Card>



        </View>
    )
}

const styles={
    cardStyle:{
        width:'100%',
        height:"100%"
    },
    topPosition:{
        margin:50,
        borderColor:'#eee',
        borderBottomWidth:2,
    },
    profilePosition:{
        width:'100%',
        justifyContent:'center',
        alignItems: 'center',
    },
    imgStyle:{
        width: 80,
        height:80,
        borderRadius:50,
        marginBottom:20,
    },
    nameStyle1:{
        fontWeight:'bold',
        fontSize:25,
        color:'#FF6464'
    },
    nameStyle2:{
        fontWeight:'bold',
        fontSize:25,
        color:'#3E5481'
    },
    schoolStyle:{
        fontWeight:'bold',
        fontSize:18,
        marginLeft:10,
        color:'#9FA5C0'

    },
    detailtext1:{
        fontWeight:'bold',
        color:'#3E5481',
        fontSize:20,
        marginBottom:10
    },
    detailtext2:{
        textAlignVertical: 'center',
        height: '100%',
        fontWeight:'bold',
        fontSize:18,
        color:'#9FA5C0',
        marginBottom:30
    },
    detailPosition:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomPosition:{
        borderColor:'#eee',
        borderBottomWidth:5,
    },

    projectPosition:{
        margin:15
    },
    projectText:{
        fontSize:25,
        fontWeight:'bold',
        color:'#3E5481',
    },
    projectScroll:{
        height:'30%',
        marginBottom:10,
        borderRadius:10
    }
}


export default ProfileView;
