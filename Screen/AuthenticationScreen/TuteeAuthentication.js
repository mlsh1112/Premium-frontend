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
import AsyncStorage from '@react-native-community/async-storage';
import {PickMultipleFile,PickSingleFile} from '../../src/DocumentPicker';
import {getproject} from '../../src/Api'
function makeItem(project){
    const temp = project.map((pr)=>({
        label: pr.title,
        value: pr.title,
    }));
    return temp;
}

const TuteeAuthentication = ({navigation}) => {
    const [project,setProject] = useState([
        {id:0,title: "수학2 마스터하기", info:"반복학습을 통한 수학2 마스터하기",fin:true},
        {id:1,title: "비문학 마스터하기", info:"회독을 통한 비문학 마스터하기",fin:false},
        {id:2,title: "국사 마스터하기", info:"중요파트 집중을 통한 국사 마스터하기",fin:true}
      ]);
    const listitem = makeItem(project)
    const [selectedpr,setSelectedpr] = useState('')
    const [files,setFiles] = useState([]);
    const [text,setText] = useState('');
    const [fin,setFin]=useState(false);
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
    const isFinish = (id) =>{
        if(id){
            return(project[id].fin)
        }
        else{
            return false
        }
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
                                style={styles.cancelButton} 
                                onPress={(e)=>{
                                    deleteFiles(key);
                                }}>
                                    <Text stlye={styles.cancelText}>Cancel</Text>
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
                      setFin(isFinish(index))
                    }}
                    items={listitem}
                    placeholder={{  // 값이 없을때 보일 값, 없어도 된다면 이 안의 내용을 지운다. placeholder={{}} 이건 남겨둠.. 이부분까지 지우면 기본값으로 설정됨.
                     label: '인증할 프로젝트를 선택하세요',
                      value: '인증할 프로젝트를 선택하세요',
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
                {fin?
                <Button onPress={()=>{
                    navigation.push('AuthPayBack')
                }}><Text>보증금 환급 받기!</Text></Button>
                :
                <Button onPress={handleSubmitAuthenticatoin}><Text>인증 완료</Text></Button>
                
                }
                
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
        margin:'3%',
    },
    textposition:{
        marginTop:70,
        marginLeft:30,
        fontSize:30,
        fontWeight:'bold'
    },
    pickerstyle:{
        width: "90%",
        marginTop:'1%',
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
      backgroundColor: 'white',
      fontSize: 15,
      marginTop: 16,
      color: 'black',
    },
    InputStyle: {
      width: "90%",
      height:"10%",
      margin: 10,
      color: "black",
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: '#dadae8',
    },
    cancelButton: {
        backgroundColor:colors.maincolor,
        padding:3,
        margin:3,
        borderRadius:5,
        alignItems: 'flex-end'
    },
    cancelText: {
        color: 'red',
        fontWeight: "bold",
    },
  });

export default TuteeAuthentication;
