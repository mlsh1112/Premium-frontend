import React,{ useState } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    ActivityIndicator
  } from 'react-native';
import firebase,{firestore} from '../../FirebaseConfig/Firebase'
import {updateproject} from '../../src/Api'

const CreateChatRoom = (props) => {
    const {myinfo,latestpr} = props.route.params
    const roomName = latestpr.title + ' 채팅방 - ' + myinfo.name + ' 튜터' 
    const groupsRef = firestore.collection('GROUPS').doc()
    console.log('send firestore')
    groupsRef.set({
        groupID: groupsRef.id,
        groupName: roomName,
        userID: myinfo.id,
        projectID: latestpr.id
    }).then((docRef)=> {
        addMember(groupsRef.id,myinfo.id)
    }).catch(e => {
        console.log(e)
    })
    
    function addMember(groupID,userID){
        const membersRef = firestore.collection('members').doc(groupID).collection('member').doc()
        membersRef.set({
            userID: userID
        }).then(()=>{
            updateproject(latestpr.id,
                {
                    "project":{
                        "chat": "able",
                    }
                }).then(res => {
                    console.log(res.data)
                    alert(latestpr.title + ' 채팅방'+ ' 개설이 완료되었습니다.')
                    props.navigation.goBack()
                }).catch(e=> {
                    console.log(e)
                })
        }).catch(e => {
            console.log(e)
        })
    }
    return(
        <View style={styles.container}>
            <ActivityIndicator color="black" />
        </View>
    );
  
}
const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
        alignItems:'center',
    },
  });
export default CreateChatRoom;