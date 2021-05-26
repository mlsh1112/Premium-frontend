import React,{useState,useEffect} from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase,{firestore} from '../../FirebaseConfig/Firebase'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
  } from 'react-native';
import GroupsItem from './GroupItem'

const Chatroom = (props) => {
    const {myinfo,latestpr} = props.route.params
    const [groups,setGroups] = useState([])
    
    useEffect(()=>{
        // if(latestpr !==undefined){
        //     getChats()
        // }

        const unsubscribe = getChats()
        return unsubscribe;
    },[])

    function getChats(){
        const db = firestore
        var groupArray = []

        db.collection('GROUPS').get().then(snapshot => {
            snapshot.forEach((doc)=> {
                console.log(doc.data())
                groupArray.push(doc.data())
            })
            groupArray = groupArray.filter((group)=>{
                    var check = 0
                    latestpr.map((pr)=> {
                        
                        if(myinfo.type ==='Tutee'){
                            if( pr.project.id === group.projectID){
                                check = 1
                            }
                        }else {
                            if( pr.id === group.projectID){
                                check = 1
                            }
                        }
                    })
                    return check === 1
                })
                setGroups(groupArray)
        })
    }

    return (
        <View style={styles.container}>
          <FlatList
            data={groups}
            keyExtractor={(item, index) => 'key' + index}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => {props.navigation.navigate('Message',{ item: item,myinfo:myinfo})}}>
                <GroupsItem item={item} />
              </TouchableOpacity>
            )}
            style={{width:'90%'}}
          />
        </View>
    )
  
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:'center',
      alignItems:'center',
    },
   
  })
export default Chatroom;