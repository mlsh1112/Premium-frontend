import React, { useState,useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
  } from 'react-native';
import colors from '../colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Like = (props) => {
    const [like,setLike] = useState(false);
    const [numOfLike,setNumOfLike] = useState(0) //api 요청보내서 받아옴

    useEffect(()=> {
        //get numoflike
        //setNumOfLike(res.data.numoflike)
    },[])
    const _toggle = () => {
        if (!like){
            console.log("좋아요 눌림")
            setNumOfLike((prev) => prev + 1)
            //api 요청 전송
            //setnumOfLike
        }else {
            setNumOfLike((prev) => prev - 1)
            console.log('좋아요 취소')
            //api 요청
            //setnumOfLike
        }
        setLike((prev) => !prev);
    };
    return (
        <TouchableOpacity style={styles.likebox} onPress={()=>_toggle()}>
                {like === false ? (
                  <MaterialCommunityIcons name='heart-outline' size={20} color={colors.maincolor}/>
                ) : (
                  <MaterialCommunityIcons name='heart' size={20} color="red"/>
                )}<Text style={styles.likeText}>{numOfLike} 좋아요</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    likebox: {
        flexDirection: 'row',
        margin: 5
    },
    likeText:{
        fontWeight:'bold',
        color:colors.maincolor,
        fontSize:17,
        marginLeft:5
      },
  });
export default Like;