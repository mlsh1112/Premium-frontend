import React, { Component,useState } from 'react';
import colors from '../../src/colors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
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
import {Button} from '../../src/components'
function makeItem(projectlist){
    const temp = projectlist.map((pr)=>({
        label: pr.title,
        value: pr.title,
    }));
    return temp;
}
const getProject=(title,projectlist)=>{
    const project =  projectlist.filter(project=>project.title==title)
    return project
}
function TuteeListComponent({tutee,navigation}){
    return(
        <View style={styles.tuteeBarStyle}>
            <Icons name='face' size={30} style={{marginLeft:'8%'}} ></Icons>
            <Text style={styles.tuteenameStyle}>{tutee.name}</Text>
            <TouchableOpacity style={styles.tuteeBtnPosition} onPress={()=>{navigation.push('TutorAuthCheck',tutee)}}>
                <View>
                    <Text style={styles.BtntextStyle}>인증 확인</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}


const TutorAuthentication = ({navigation}) => {
    const [projectlist,setProjectlist] = useState([
        {id:1,title: "수학2 마스터하기", info:"반복학습을 통한 수학2 마스터하기", fin:true},
        {id:2,title: "비문학 마스터하기", info:"회독을 통한 비문학 마스터하기", fin:false},
        {id:3,title: "국사 마스터하기", info:"중요파트 집중을 통한 국사 마스터하기", fin:true}
      ]);
    const listitem = makeItem(projectlist)
    const [selectedpr,setSelectedpr] = useState('')
    const [tutees,setTutees] = useState([
        {id: 0,name: "LEE", auth:"1+1=2"},
        {id: 1,name: "KIM", auth:"5*5=25"},
      ]);
    const [fin,setFin]=useState(false)
    const [project, setProject]=useState()
    const handleSubmitAuthenticatoin = () => {
        Keyboard.dismiss();
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.pickerstyle}>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value,index) => {
                      setSelectedpr(value)
                      console.log(value,index)
                      if (value!=null){
                        setProject(getProject(value,projectlist))
                        setFin(project[0].fin)
                      }
                      
                    }}
                    items={listitem}
                    placeholder={{  // 값이 없을때 보일 값, 없어도 된다면 이 안의 내용을 지운다. placeholder={{}} 이건 남겨둠.. 이부분까지 지우면 기본값으로 설정됨.
                     label: '인증할 프로젝트를 선택하세요',
                      value: null,
                    }}>
                    <Text>{selectedpr}</Text>
                </RNPickerSelect>
            </View>

            <View style={{flexDirection:'row',borderColor:'#D0DBEA',
        borderBottomWidth:2,width:'80%',marginBottom:'5%',
        justifyContent:'center',
        alignItems: 'center',}}>
                <View style={styles.precentPosition}>
                    <Text style={styles.presentTextStyle}>현재 진행률</Text>
                    <Text style={styles.percentStyle}>30%</Text>
                </View>

                <View style={styles.precentPosition}>
                    <Text style={styles.authTextStyle}>인증 진행률</Text>
                    <Text style={styles.percentStyle}>30%</Text>
                </View>
            </View >


            <View style={{marginRight:'55%', marginBottom:'5%'}}>
            <Text style={styles.authtuteeStyle}>인증 한 튜티</Text>
            </View>

            {fin ? 
            <ScrollView style={{marginLeft:'20%', width:'100%'}}>
                {tutees.map((tutee,index)=>{
                           return <TuteeListComponent 
                           tutee={tutee}
                           navigation={navigation}
                           key={index}
                           />
                        })}
            </ScrollView>
            :
            <View >
                <View style={{marginTop:100,marginBottom:150}}>
                <Text style={styles.paytxtStyle}>이 프로젝트는 완료된 프로젝트 입니다!</Text>
                <Text style={styles.paytxtStyle}>보증금을 신청하세요!</Text>
                </View>
            <Button onPress={()=>{
                    navigation.push('AuthPayBack')}}
                    style={{width:'100%'}}>
                        <Text>보증금 환급 받기!</Text>
            </Button>
            </View>   
            }

            
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
    precentPosition:{
        flex:1,
        margin: '10%',
        justifyContent:'center',
        alignItems: 'center',
        height:'25%'
    },
    presentTextStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:colors.maincolor,
        marginBottom:'20%'
    },
    authTextStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:'#FF6464',
        marginBottom:'20%'

    },
    percentStyle:{
        fontWeight:'bold',
        color:'#9FA5C0',
        fontSize:25
    },
    authtuteeStyle:{
        fontWeight:'bold',
        fontSize:20,
        color:'#9FA5C0',

    },
    tuteeBarStyle:{
        backgroundColor:'#D0DBEA',
        width:'80%',
        height:'60%',
        marginBottom:'5%',
        alignItems: 'center',
        borderRadius:20,
        flexDirection:'row'
    },
    tuteenameStyle:{
        marginLeft:'5%',
        fontSize:20,
    },
    tuteeBtnPosition:{
        marginLeft:'35%',
        backgroundColor:'#1FCC79',
        width:'30%',
        height:'60%',
        borderRadius:20,
        alignItems: 'center',
        justifyContent:'center',
    },
    BtntextStyle:{
        color:'white',
        fontWeight:'bold',
        fontSize:17
    },
    paytxtStyle:{
            fontSize:20,
            fontWeight:'bold'
        
    },
  });

export default TutorAuthentication;
