import React,{useState,useEffect} from 'react';
import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
import {Alert,View,ActivityIndicator} from 'react-native'
import firebase,{firestore} from '../../FirebaseConfig/Firebase'
import colors from '../../src/colors'
import { IconButton } from 'react-native-paper';

const Messsage = (props) => {
    console.log('////////////////////////////////')
    console.log(props.route.params.myinfo)
    console.log('////////////////////////////////')
    const {myinfo,item} = props.route.params
    const [messages, setMessages] = useState([])
    const[isJoin,setIsJoin] = useState(false)

    useEffect(()=> {
        const db = firestore
        var messages = []
        checkUser()
        const unsubscribe = db.collection('message').doc(item.groupID).collection('messages').orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
            snapshot.docs.map(doc => ({
                _id: doc.data()._id,
                createdAt: doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user,
            }))
            ));
            return unsubscribe;
    },[])

    function checkUser(){
        firestore.collection('members').doc(item.groupID).collection('member').where('userID','==',myinfo.id)
        .get().then(querySnapshot => {
            if(querySnapshot.size >0){
                querySnapshot.forEach((doc)=>{
                    if(doc.data() != null){
                        setIsJoin(true)
                    }else {
                        setIsJoin(false)
                        showAlertToJoin()
                    }
                })
            }else {
                showAlertToJoin()
            }
        }).catch(e => {
            console.log(e)
        })
    }
    function joinGroup(){
        const groupMemberRef = firestore.collection('members').doc(item.groupID).collection('member').doc()
        groupMemberRef.set({
            userID: myinfo.id,
        }).then(docRef=> {
            Alert.alert("환영합니다.")
        }).catch(e => {
            console.log(e)
        })
    }
    function showAlertToJoin(){
        Alert.alert('','채팅방에 참가하시겠습니까?',[
            {
                text: 'yes',
                onPress: ()=> {
                    joinGroup()
                }
            },
            {
                text:'no',
                onPress:() => {
                    props.navigation.goBack()
                }
            }
        ])
    }

    function handleSend(newMessage = [],myinfo) {
        console.log(newMessage)
        const MessageRef = firestore.collection("message").doc(item.groupID).collection('messages').doc()
        setMessages(GiftedChat.append(messages, newMessage))
        const {_id,createdAt,text,user} = newMessage[0]
        MessageRef.set({
            _id,
            createdAt,
            text,
            user
        }).then(()=> {
        console.log('message from ',myinfo.id)
        }).catch((e)=> {
            console.log(e)
        })
    }
    function renderBubble(props){
        return (
            <Bubble
              {...props}
              wrapperStyle={{right: {backgroundColor: colors.maincolor},left: {backgroundColor: colors.subcolor}}}
              textStyle={{right: {color: '#fff'},left : {color : 'rgba(0,0,0,0.7)'}}}
            />
          );
    }
    function renderSend(props){
        return(
            <Send {...props}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                  <IconButton icon='send-circle' size={32} color={colors.subcolor2} />
                </View>
            </Send>
        )
    }
    function scrollToBottomComponent(){
        return (
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <IconButton icon='chevron-double-down' size={36} color='rgba(0,0,0,0.3)' />
            </View>
          );
    }
    function renderLoading(){
        return (
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <ActivityIndicator size='large' color='#6646ee' />
            </View>
          );
    }
    return(
        <GiftedChat 
            messages={messages}
            onSend={newMessage => handleSend(newMessage,myinfo)}
            user={{
                _id: myinfo.id,
                name: myinfo.name
                }}
            placeholder={'메세지를 입력하세요'}
            isLoadingEarlier={true}
            renderBubble={renderBubble}
            alwaysShowSend={true}
            renderSend={renderSend}
            scrollToBottom={true}
            scrollToBottomComponent={scrollToBottomComponent}
            renderLoading={renderLoading}
        />
    )
}


export default Messsage