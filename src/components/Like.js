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
import {createlike, deletelike,islike} from '../Api';

const Like = (props) => {
    const [like,setLike] = useState(false);
    const [numOfLike,setNumOfLike] = useState(props.project.tutor.likes_count) //api 요청보내서 받아옴
    const [likeid,setLikeid] = useState(-1)
    useEffect(() => {
        islike(
            {
                "like":{
                    likable_type: 'User',
                    likable_id: props.project.tutor.id,
                }
            }
        ).then(res => {
            console.log('좋아요 체크중')
            if (res.status === 200 ){
                setLike(true)
                setLikeid(res.data.id)
            }
        }
        ).catch(e => {
            if(e.response.status ===404){
                console.log('좋아요 객체 에러')
            }
        })
    },[])

    const _toggle = () => {
        if (!like){
            console.log("좋아요 눌림")
            setNumOfLike((prev) => prev + 1)
            createlike(
                {"like":{
                        likable_type: 'User',
                        likable_id: props.project.tutor.id,
                    }
                }
            ).then(res => {
                console.log(res.data)
                setLikeid(res.data.id)
            }).catch(e => console.log(e))
        }else {
            setNumOfLike((prev) => prev - 1)
            console.log('좋아요 취소')
            deletelike(likeid).then(res => console.log(res)).catch(e => console.log(e))
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