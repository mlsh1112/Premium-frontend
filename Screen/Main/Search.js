import React, { Component, useState } from 'react';
import { CircularCard } from "react-native-circular-card-view";
import {SafeAreaView} from "react-native"
import cat from '../../assets/cat2.png'
import { useEffect } from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
    useWindowDimensions,
    FlatList,
    Keyboard,
    TouchableOpacity
  } from 'react-native';
import {Searchbar,Card } from 'react-native-paper'
import { getprojects } from '../../src/Api';
import ProjectMini from '../../src/components/ProjectMini'
import colors from '../../src/colors';
const moment = require("moment");
function SearchCard (props){
  const {width,height} = useWindowDimensions();
  const project = props.project
  const tutor = props.project.tutor
  const startDate = moment(project.started_at).format('YYYY-MM-DD')
  return(

    <View style={cardstyles.container}>
      <TouchableOpacity
        style={cardstyles.cardPosition}
        onPress={()=>{
          props.navigation.navigate('ProjectDetail',{project:project})}}> 
      <Card style={cardstyles.cardstyle}>
        <Text style={cardstyles.prjName}>{project.title}</Text>
        <Text style={cardstyles.txtstyle}>{project.description}</Text>
        <View style={{flexDirection:'row',marginVertical:5}}>
        <Text style={cardstyles.txtstyle}>{project.deposit} 원  |  </Text>
        <Text style={cardstyles.txtstyle}>{project.duration} 일</Text>
        </View>
        <Text style={cardstyles.txtstyle}>{startDate} 부터 시작</Text>
      </Card>
      </TouchableOpacity>
      <TouchableOpacity style={cardstyles.tutorPosition}
      onPress={()=> props.navigation.navigate('ProfileView',{latestpr:project})}
      >
        <Image
              style={{
                width: width*0.2,
                height: height*0.1,
                borderRadius:10,
                marginLeft:10
              }}
              source={{
                uri:tutor.image
              }}
            />
          <Text style={cardstyles.tutorName}>{tutor.name}</Text>
      </TouchableOpacity>
    </View>
  )
}

function Search({navigation}) {
  const [Searchblur,SetSearchblur]=useState(false);
  const [SearchData,SetSearchData]=useState("");
  const [isLoading,SetIsLoading]=useState(false);
  const [reqData,SetreqData]=useState([])
  let ScreenWidth = Dimensions.get('window').width    //screen 너비
  let ScreenHeight = Dimensions.get('window').height   //height 높이
  const ChangeSearchData=((text)=>{
      if(text){
        SetSearchblur(true);
      }
      else{
        SetSearchblur(false);
      }
      SetSearchData(text);
      //console.log(SearchData);
    })
    async function SearchVal (){
      if(SearchData.length<=0){
        alert("2글자 이상의 검색어를 입력해주세요")
      }
      else{
        const query = {title_or_description_i_cont: SearchData}
        const data = (await getprojects({ q: query})).data
        //console.log(data)
        SetreqData(data)
      }
    }
    useEffect(()=>{
      if(Searchblur){
        SetSearchblur(false)
      }

    },[reqData])
  return(
    <SafeAreaView style={{flex:1}}>
    <View style={{flex:1}} >
      <View
            style={{height:80,
                    backgroundColor:colors.maincolor,
                    justifyContent:'center',
                    paddingHorizontal:8,
                }}>
           <Searchbar
                placeholder="Search"
                onChangeText={ChangeSearchData}
                //onIconPress={SearchVal}
                onSubmitEditing={SearchVal}
                onKeyPress={(e)=>{if(e.key==='Enter')
                console.log('엔터클릭')
            }}
            />
            
        </View>
      <View style={styles.Searchlist}>
        <FlatList
           //style={{backgroundColor:Searchblur? 'rgba(0,0,0,0.3)':''}}
           data={reqData}
           keyExtractor={(item,index)=>index.toString()}
           renderItem={({item,index})=>
           <SearchCard navigation={navigation} project={item} key={index}></SearchCard>

        }
          />
      </View>
    </View>
    </SafeAreaView>
  )
}

const cardstyles = StyleSheet.create({
  container:{
      flex:1,
      flexDirection:'row',
      padding:10,
      marginVertical:10,
      borderRadius:10
  },
  cardPosition:{
    flex:3,
  },
  cardstyle:{
    padding:15
  },
  tutorPosition:{
    flex:1,
    alignContent:'center',
    justifyContent:'center'
  },
  tutorName:{
    fontWeight:'bold',
    fontSize:16,
    marginLeft:'25%',
    padding:7
  },
  prjName:{
    fontSize:17,
    fontWeight:'bold',
    marginVertical:5
  },
  txtstyle:{
    color:'gray'
  }
})

const styles = StyleSheet.create({
  Searchlist: {
      flex:1,
      padding: 10,
  },
  Serach: {
      margin: 5,
      padding: 15,
      borderRadius: 15,
      elevation: 20,
      borderRadius: 15,
  },
  thumbnail: {
      borderRadius: 13,
      width: 160,
      height: 200,
  },  
  Serachtitle: {
      fontWeight: 'bold',
      fontSize: 16,
      paddingHorizontal: 15,
      paddingVertical: 2,
  },
  author: {
      paddingHorizontal: 15,
      paddingVertical: 4,
  },
});
export default Search;