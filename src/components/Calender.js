import React, { Component } from 'react';
import {Button} from '../src/components';
import {Calendar,CalenderList,Agenda, CalendarList} from 'react-native-calendars';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
  } from 'react-native';
import { useEffect,useState } from 'react';
import { addDays, startOfWeek,format,getDate } from 'date-fns';
import { object } from 'yup';

function Calender(){

  const [markedDates,setmarkedDates]=useState()
  const [CalenderDay,SetCalendderDay]=useState([
    {start_date:'2021-04-05', date1:'2021-04-06', date2:'2021-04-07', date3:'2021-04-08', end_date:'2021-04-09'},
    {start_date:'2021-04-12', date1:'2021-04-13', date2:'2021-04-14', date3:'2021-04-15', end_date:'2021-04-16'},
    {start_date:'2021-04-19', date1:'2021-04-20', date2:'2021-04-21', date3:'2021-04-22', end_date:'2021-04-23'},
    {start_date:'2021-04-26', date1:'2021-04-27', date2:'2021-04-28', date3:'2021-04-29', end_date:'2021-04-30',title:'1.유리수와정수 '},  
  ])

  
  const color=[['#50cebb','#70d7c7'],['#5C7210','#A3C821'],['#EFA519','#C8880E'],['#049413','#09CD1D']];


  function DateSet(day){
      var c={}
      var i=0;
      
      CalenderDay.map((item)=>{
        Object.assign(c,{[item.start_date]:{startingDay: true, color:color[i][0] , textColor: 'white', }},{[item.date1]:{color: color[i][1], textColor: 'white'}},{[item.date2]:{color: color[i][1], textColor: 'white'}},{[item.date3]:{color: color[i][1], textColor: 'white'}},{[item.end_date]:{endingDay: true, color:color[i][0] , textColor: 'white'}})
        
        if(i<4){
          i++
        }
      })

      setmarkedDates(c);
  } 
  
    return(
        <View style={{ paddingTop: 50, flex: 1 }}>
        <Calendar
          onDayPress={(day)=>DateSet(day)}
          markedDates={markedDates}
          markingType={'period'}
         />
        </View>
    )
}

export default Calender;
