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


function Calender(){

  const [markedDates,setmarkedDates]=useState(null)
  const [CalenderDay,SetCalendderDay]=useState([
    {date:'2021-05-22', confirm:false},
    {date:'2021-05-23', confirm:true},
    {date:'2021-05-24', confirm:false},
    {date:'2021-05-10', confirm:true},
    {date:'2021-05-04', confirm:false},
  ])
  
  function DateSet(){
    let obj=CalenderDay.reduce((c,v)=>v.confirm?
        Object.assign(c,{[v.date]:{disabled:true,startingDay:true,color:'green',endingDay:true},})
        :Object.assign(c,{[v.date]:{disabled:true,startingDay:true,color:'red',endingDay:true},}) 
      ,{})
      console.log(obj)
    setmarkedDates(obj)
  }
    
  
    return(
        <View style={{ paddingTop: 50, flex: 1 }}>
        <Calendar
        onDayPress={DateSet}
         markedDates={markedDates}
         markingType={'period'}
         
/>
        </View>
    )
}

export default Calender;
