import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import {
    Text,
    View,
    Body,
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

function Search() {
  const [Searchblur,SetSearchblur]=useState(false);
  const [SearchData,SetSearchData]=useState("");

  const [isLoading,SetIsLoading]=useState(false);
  const [reqData,SetreqData]=useState([])
  
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

      SetreqData(data)
    }
    
    useEffect(()=>{
      if(Searchblur){
        SetSearchblur(false)
      }
      
    },[reqData])
  
  return(
    <View style={{flex:1}} >
        <View
                    style={{height:80,
                    backgroundColor:'#1FCC79',
                    justifyContent:'center',
                    paddingHorizontal:5
                    
                }}>
           <Searchbar
                placeholder="Search"
                onChangeText={ChangeSearchData}
                onIconPress={SearchVal}
            />
            
        </View>
        <FlatList
          style={{backgroundColor:Searchblur? 'rgba(0,0,0,0.3)':'white'}}
          data={reqData}
          renderItem={({item})=>
              <TouchableOpacity>
                <Text style={{padding:20,fontSize:15}}>{item.title}</Text>
              </TouchableOpacity>
          } 
        />
    </View>
  )

}

export default Search;
