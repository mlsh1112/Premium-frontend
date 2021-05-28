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
import {getmylikes} from '../Api';
import cat from '../../assets/cat2.png' 
import LikelistCard from './LikelistCard'


const RenderLikeList = (props) => {
    return (
        props.likelist.map((like,index)=> {
        
            return(
                <View style={{margin: 10,height:80,flexDirection:'row',flexWrap:'wrap',borderTopLeftRadius:20}} key={index}>
                    <View style={{backgroundColor:colors.maincolor,height:'100%',width:'20%',justifyContent:'center',alignItems:'center',borderTopLeftRadius:20}}>
                        <Image source={cat} style={{width:60,height:60,borderRadius:30}}/>
                    </View>
                    <View style={{backgroundColor:'white',width:'80%',height:'100%',padding:5,justifyContent:'center'}}>
                        <Text style={{fontSize:20,fontWeight:'bold'}}>{like.name}</Text>
                        <Text>project title</Text>
                    </View>
                </View>
        
        )
        })
    )
}


const MyLike = (props) => {
    const [likelist,setLikelist] = useState(props.route.params.mylikelists)
    useEffect(() => {
        console.log(props.route.params.mylikelists)
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