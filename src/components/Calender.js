const moment = require("moment");
import React, { Component } from 'react';
import {Calendar,CalenderList,Agenda, CalendarList} from 'react-native-calendars';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
  } from 'react-native';
import { useEffect,useState } from 'react';
function Calender(props){
  let Trial=props.project.status==='trial'?true:false;
  const [markedDates,setmarkedDates]=useState()
  function DateSet(){
      var days={}
      if(!props.plans)
      {
        console.log("null")
      }
      else{
        const color=[['#50cebb','#70d7c7'],['#5C7210','#A3C821'],['#EFA519','#C8880E'],['#049413','#09CD1D']];
        let colorpick=0;
        var Plans=props.plans.options
        let experience_period=props.project.project.experience_period
        let duringDay=0
        Plans.map((item)=>{
            colorpick++
            var start_date=moment(item.start_at).format("YYYY-MM-DD")
            var end_date=moment(item.end_at).format("YYYY-MM-DD")
            
            var date_start=moment(item.start_at);
            var date_end=moment(item.end_at);
            var PalnDays=date_end.diff(date_start,'days')
            duringDay+=PalnDays
            if(Trial&&duringDay>experience_period){}
            else{
              if(PalnDays==0){
                Object.assign(days,{[start_date]:{disabled: true, startingDay: true, color: 'green', endingDay: true}})      
              }
              else{
                  for(let j=1;j<=PalnDays;j++){ 
                    Object.assign(days,{[start_date]:{startingDay: true, color: color[colorpick%color.length][0] , textColor: 'white', }},{[moment(start_date).add(j,"d").format("YYYY-MM-DD")]:{ color: color[colorpick%color.length][1], textColor: 'white'}},{[end_date]:{endingDay: true, color: color[colorpick%color.length][0], textColor: 'white'}})    
                  }
              }
            }

            
        })
       var now=moment().format('YYYY-MM-DD');
       setmarkedDates(days);

      }
      
      
      
  } 

  useEffect(()=>{
    DateSet()
  },[props])
  
    return(
        <View style={{  paddingTop: 20,bottom:20, flex: 1 }}>
        <Calendar
          markedDates={markedDates}
          markingType={'period'}
          style={{borderRadius:25}}
         />
        </View>
    )
}


export default Calender;
