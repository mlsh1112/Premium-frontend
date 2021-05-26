import React,{ useEffect, useState } from 'react';
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

const DeleteChatRoom = (props) => {
    const {myinfo,latestpr,chatroom} = props.route.params
    
    useEffect(()=>{
        const unsubdelete = deletegroup()
        return () => {
            unsubdelete;
        }
    },[])
    
    function deletegroup() {
        console.log(chatroom.groupID)
        firestore.collection('members').doc(chatroom.groupID).collection('member').get().then(res =>{
            res.forEach(r => {
                console.log(r.id)
                firestore.collection('members').doc(chatroom.groupID).collection('member').doc(r.id).delete()
            })
        }).catch(e => console.log(e))
        firestore.collection('messages').doc(chatroom.groupID).collection('message').get().then(res =>{
            res.forEach(r => {
                console.log(r.id)
                firestore.collection('members').doc(chatroom.groupID).collection('member').doc(r.id).delete()
            })
        }).catch(e => console.log(e))
        firestore.collection('GROUPS').doc(chatroom.groupID).delete().then(res => {
            alert(latestpr.title + ' 채팅방'+ ' 삭제가 완료되었습니다.')
                            props.navigation.popToTop()
        }).catch(e=>{
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
export default DeleteChatRoom;