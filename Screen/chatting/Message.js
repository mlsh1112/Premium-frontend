import React,{useState,useEffect} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import {Alert} from 'react-native'
import firebase,{firestore} from '../../FirebaseConfig/Firebase'

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
        }).then((docRef)=> {
        console.log('message from ',myinfo.id)
        }).catch((e)=> {
            console.log(e)
        })
    }

    return(
        <GiftedChat 
            messages={messages}
            onSend={newMessage => handleSend(newMessage,myinfo)}
            user={{
                _id: myinfo.id,
                name: myinfo.name
                }}
        />
    )
}


export default Messsage