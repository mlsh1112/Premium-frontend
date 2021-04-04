import React, { Component,useState } from 'react';
import colors from '../../src/colors';
import {Button} from '../../src/components';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    TextInput,
    Keyboard,
  } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {PickMultipleFile,PickSingleFile} from '../../src/DocumentPicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { color } from 'react-native-reanimated';

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
    const [selectedpr,setSelectedpr] = useState('')
    const [files,setFiles] = useState([]);
    const [text,setText] = useState('');
    const savePickedFiles = async() => {
        console.log("pick file")
        const pickedfiles = await PickMultipleFile();
        if(pickedfiles[0] != null){
            //console.log("user picked : " + JSON.stringify(pickedfiles))
            //setFiles(files => [...files,pickedfiles[0]]);
            setFiles(files => files.concat(pickedfiles[0]))
        }
    }
    const deleteFiles = (key) => {
        console.log("----------------------------" +key)
        setFiles(files.filter((f,idx) => idx !== key))
        console.log("----------------------------" +JSON.stringify(files))
    }
    const handleSubmitAuthenticatoin = () => {
        Keyboard.dismiss();
    }
    function RenderPickedFiles({pickedfiles}){
        console.log("selected files : " + JSON.stringify(files))
        return(
          <ScrollView>
                  <View>
                    {pickedfiles.map((file,key) => {
                        //console.log("files and key : " +file + key)
                      return(
                        <View key={key}>
                            <Text name={file.name} style={styles.textStyle}>
                              File Name: {file.name ? file.name : ''}
                              {'\n'}
                              Type: {file.type ? file.type : ''}
                              {'\n'}
                              File Size: {file.size ? file.size : ''}
                              {'\n'}
                              URI: {file.uri ? file.uri : ''}
                              {'\n'}
                                <TouchableOpacity
                                style={{backgroundColor:colors.maincolor,padding:3,margin:3,borderRadius:3}} 
                                onPress={(e)=>{
                                    deleteFiles(key);
                                }}>
                                    <Icon name="file-cancel" color="white" size={20}/>
                                </TouchableOpacity>
                            </Text>
                        </View>
                      )
                    })}  
                  </View>
          </ScrollView>
        );
}
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
            <View style={styles.InputStyle}>
                <TextInput 
                    placeholder="인증할 내용을 입력해주세요." 
                    onChangeText={(value) => setText(value)}
                    onBlur={()=> Keyboard.dismiss()}
                    value={text}
                    blurOnSubmit={true}
                    multiline={true}
                />
            </View>
            <View style={{margin: 5}}>
                <Button 
                    onPress={async() => {
                        Keyboard.dismiss();
                        await savePickedFiles();
                    }}>
                        <Text>파일 제출</Text>
                </Button>
            </View>
            <RenderPickedFiles pickedfiles={files}/>
            <View style={{margin: 10}}>
                <Button onPress={handleSubmitAuthenticatoin}><Text>인증 완료</Text></Button>
            </View>
      </View>
    );
    
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        width: "100%",
        justifyContent:'center',
        alignItems: 'center',
    },
    textposition:{
        marginTop:70,
        marginLeft:30,
        fontSize:30,
        fontWeight:'bold'
    },
    pickerstyle:{
        width: "90%",
        marginTop:30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingRight: 30,
        color:"black"
    },
    textStyle: {
      padding: 10,
      backgroundColor: '#fff',
      fontSize: 15,
      marginTop: 16,
      color: 'black',
    },
    InputStyle: {
      width: "90%",
      margin: 10,
      color: "black",
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
  });

export default Authentication;
