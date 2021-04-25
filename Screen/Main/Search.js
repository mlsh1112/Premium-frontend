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
const listItems=['Development','Business','IT&Software','Office Productivity','Personal Development',
 'Design','Marketing','LifeStyle','ddd','ssss','adfasdf','dsagadsg' ]

function Search() {
  const [Searchblur,SetSearchblur]=useState(false);
  const [SearchData,SetSearchData]=useState("");

  const [reqData,SetreqData]=useState(


  )
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
  
    const SearchVal = async()=>{
      const query = {title_or_description_i_cont: SearchData}
      console.log(typeof query)
      const data = (await getprojects({ q: query})).data
        console.log(data);
     }
    

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
          data={listItems}
          renderItem={({reqData})=><Text style={{padding:20,fontSize:15}}>{reqData}</Text>}  
        />
    </View>
  )

}

export default Search;
