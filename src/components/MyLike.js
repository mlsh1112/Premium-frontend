import React, { useState,useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Card,
    ScrollView
  } from 'react-native';
import colors from '../colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getmylikes,islike} from '../Api';
import cat from '../../assets/cat2.png' 
import Like from './Like'
import axios from 'axios'

const RenderLikeList = (props) => {
    // const likeidlist = props.likelist.map((like)=>{
    //     islike(
    //         {
    //             "like":{
    //                 likable_type: 'User',
    //                 likable_id: like.id,
    //             }
    //         }
    //     ).then(res => {
    //         console.log('좋아요 확인중')  
    //         console.log(res.data.id)  
    //         return res.data.id
    //     }
    //     ).catch(e => {
    //         console.log('＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠')
    //         console.log(e)
    //         console.log('＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠＠')
    //     })
    // })
    // console.log('---------------------------')
    // console.log(likeidlist)
    // console.log('---------------------------')
    return (
        props.likelist.map((like,index)=> {
        
            return(
                <View style={{margin: 10,height:80,flexDirection:'row',flexWrap:'wrap',borderTopLeftRadius:20}} key={index}>
                    <View style={{backgroundColor:colors.maincolor,height:'100%',width:'20%',justifyContent:'center',alignItems:'center',borderTopLeftRadius:20}}>
                        <Image source={cat} style={{width:60,height:60,borderRadius:30}}/>
                    </View>
                    <View style={{flexDirection:'row',backgroundColor:'white',width:'80%',height:'100%',padding:5,justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>{like.name}</Text>
                        
                        <Like tutor={like} likecondition={true}/>
                    </View>
                </View>
        
        )
        })
    )
}


const MyLike = (props) => {
    const [likelist,setLikelist] = useState(props.route.params.mylikelists)
    useEffect(() => {
        axios.all(
            [islike({"like":{likable_type: 'User',likable_id: 94,}}),
             islike({"like":{likable_type: 'User',likable_id: 95,}}),
             islike({"like":{likable_type: 'User',likable_id: 98,}})]
        ).then(axios.spread((like1,like2,like3)=>{
            console.log('****************************')
            console.log(like1.data,like2.data,like3.data)
            console.log('****************************')
        })).catch(e => {
            console.log('****************************')
            console.log(e.response)
            console.log('****************************')
        })
        // console.log(props.route.params.mylikelists)
        // getmylikes().then(res => {
            // console.log(res.data)
        // }).catch(e => {
            // console.log(e)
        // })
    },[])
    
    return (
        <View style={{margin: 20}}>
            <RenderLikeList likelist={likelist}/>
        </View>
    );
};

export default MyLike;