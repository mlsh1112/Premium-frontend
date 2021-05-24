import React, { Component, useState } from 'react';
import { CircularCard } from "react-native-circular-card-view";
import {SafeAreaView} from "react-native"
import cat from '../../assets/cat2.png'
import { useEffect } from 'react';
import {
    Image,
    Text,
    View,
    Body,
    ImageBackground,
    Button,
    StyleSheet,
    TextInput,
    Dimensions,
    ScrollView,
    StatusBar,
    Alert,
    FlatList,
    Keyboard,
    TouchableOpacity
  } from 'react-native';
import {Searchbar } from 'react-native-paper'
import { getprojects } from '../../src/Api';
import ProjectMini from '../../src/components/ProjectMini'

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
      console.log(SearchData);
    })
  
    async function SearchVal (){
      if(SearchData.length<=0){
        alert("2글자 이상의 검색어를 입력해주세요")
      }
      const query = {title_or_description_i_cont: SearchData}
      const data = (await getprojects({ q: query})).data

      console.log(data)
      SetreqData(data)
    }
    
    useEffect(()=>{
      if(Searchblur){
        SetSearchblur(false)
      }
      console.log(navigation
)
    },[reqData])
  
  return(
    <SafeAreaView style={{flex:1}}>
    <View style={{flex:1}} >
      <View
                    style={{height:80,
                    backgroundColor:'#1FCC79',
                    justifyContent:'center',
                    paddingHorizontal:5,
                }}>
           <Searchbar
                placeholder="Search"
                onChangeText={ChangeSearchData}
                onIconPress={SearchVal}
                onKeyPress={(e)=>{if(e.key==='Enter')
                console.log('엔터클릭')
              
            }}
            />
            
        </View>
      <View style={styles.Searchlist}>
        <FlatList
           style={{backgroundColor:Searchblur? 'rgba(0,0,0,0.3)':'white'}}
           data={reqData}
           
           renderItem={({item})=>
            
          <TouchableOpacity style={styles.Serach}onPress={()=>{
             console.log(item)
             navigation.navigate('ProjectDetail',{project:item})}}>

              <Image style={styles.thumbnail} source={cat}>
              </Image>
              <View>
                <Text style={styles.Serachtitle}>제목 : {item.title}</Text>
                <Text style={styles.Serachtitle}>프로젝트 설명 :{item.description} {item.title}</Text>
                <Text style={styles.Serachtitle}>체험 일수 : {item.experience_period}</Text>
                
              </View>
            </TouchableOpacity>
             
          
        }
          
          />
        </View>
    </View>
    </SafeAreaView>
  )

}

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
