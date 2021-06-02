import React, { useState,useEffect } from 'react';
import {
    View,
    Text,
    Image,
  } from 'react-native';
import colors from '../colors';
import {getlikes} from '../Api';
import cat from '../../assets/cat2.png' 
import Like from './Like'

const RenderLikeList = (props) => {
    return (
        props.likelist.map((tutor,index)=> {
            if(tutor.likable){
                return(
                    <View style={{margin: 10,height:80,flexDirection:'row',flexWrap:'wrap',borderTopLeftRadius:20}} key={index}>
                        <View style={{backgroundColor:colors.maincolor,height:'100%',width:'20%',justifyContent:'center',alignItems:'center',borderTopLeftRadius:20}}>
                            {tutor.likable.image === ' '
                               ? <Image source={cat} style={{width:60,height:60,borderRadius:30}}/>
                               : <Image source={{uri: tutor.likable.image}} style={{width:60,height:60,borderRadius:30}}/>
                            }
                        </View>
                        <View style={{flexDirection:'row',backgroundColor:'white',width:'80%',height:'100%',padding:5,justifyContent:'space-between',alignItems:'center'}}>
                            <Text style={{fontSize:20,fontWeight:'bold'}}>{tutor.likable?.name}</Text>
                            
                            <Like tutor={tutor.likable} likecondition={true} likeid={tutor.id} setNumoflike={props.setNumoflike}/>
                        </View>
                    </View>
            )
            }else {
                return null
            }
        })
    )
}


const MyLike = (props) => {
    const [likelist,setLikelist] = useState(props.route.params.mylikelists)
    const [numoflike,setNumoflike] = useState((props.route.params.mylikelists).length)
    useEffect(() => {
        getlikes().then(res => {
            setLikelist(res.data)
            console.log(res.data)
        }).catch(e=>{
            console.log(e)
        })
    },[numoflike])
    
    return (
        <View style={{margin: 20}}>
            <RenderLikeList likelist={likelist} numoflike={numoflike} setNumoflike={setNumoflike}/>
        </View>
    );
};

export default MyLike;