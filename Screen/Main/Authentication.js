import React, { Component,useState } from 'react';
import colors from '../../src/colors';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
  } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

function makeItem(project){
    const temp = project.map((pr)=>({
        label: pr.title,
        value: pr.title,
    }));
    return temp;
}

const Authentication = () => {
    const [project,setProject] = useState([
        {id: 1,title: "수학2 마스터하기", info:"반복학습을 통한 수학2 마스터하기"},
        {id:2,title: "비문학 마스터하기", info:"회독을 통한 비문학 마스터하기"},
        {id:3,title: "국사 마스터하기", info:"중요파트 집중을 통한 국사 마스터하기"}
      ]);
    const listitem = makeItem(project)
    const [selectedpr,setSelectedpr] = useState('인증할 프로젝트를 선택하세요')
        return (
            <View style={styles.container}>
                <View style={styles.pickerstyle}>
                    <RNPickerSelect
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value,index) => {
                          setSelectedpr(value)
                          console.log(value,index)
                        }}
                        items={listitem}
                        placeholder={{  // 값이 없을때 보일 값, 없어도 된다면 이 안의 내용을 지운다. placeholder={{}} 이건 남겨둠.. 이부분까지 지우면 기본값으로 설정됨.
                         label: '인증할 프로젝트를 선택하세요',
                          value: null,
                        }}>
                        <Text>{selectedpr}</Text>
                    </RNPickerSelect>
                </View>
                
          </View>
        );
    
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent:'center',
    },
    textposition:{
        marginTop:70,
        marginLeft:30,
        fontSize:30,
        fontWeight:'bold'
    },
    pickerstyle:{
        margin:30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingRight: 30,
        color:"black"
    },
    bar: {
        flex:1,
        marginTop:10,
        position: 'absolute',
        width: '100%',
        height: 5,
        left: 0,
        top: 179,
        backgroundColor: '#ced4da'
      }
  });

export default Authentication;
