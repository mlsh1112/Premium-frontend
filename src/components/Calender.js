const moment = require("moment");
import {getPlan} from '../../src/Api'
import React, { Component } from 'react';
import {Button} from '../../src/components/Button';
import {Calendar,CalenderList,Agenda, CalendarList} from 'react-native-calendars';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
  } from 'react-native';
import { useEffect,useState } from 'react';

import { object } from 'yup';

function Calender(props){

  
  console.log(props.props);  
    
  const [markedDates,setmarkedDates]=useState()
  const [CalenderDay,SetCalendderDay]=useState([
    {start_date:'2021-04-05', date1:'', date2:'', date3:'', end_date:'2021-04-09'},
    {start_date:'2021-04-12', date1:'', date2:'', date3:'', end_date:'2021-04-16'},
    {start_date:'2021-04-19', date1:'', date2:'', date3:'', end_date:'2021-04-20'},
    {start_date:'2021-04-23', date1:'', date2:'', date3:'', end_date:'2021-04-28',title:'1.유리수와정수 '},  
  ])
  
  const color=[['#50cebb','#70d7c7'],['#5C7210','#A3C821'],['#EFA519','#C8880E'],['#049413','#09CD1D']];


  function DateSet(day){
      var c={}
      var i=0;

      CalenderDay.map((item)=>{
        const DateB = moment(item.start_date)
        const DateC = moment(item.end_date)
        const subnum= DateC.diff(DateB,'days')
        

        for(let j=1;j<=subnum;j++){
        Object.assign(c,{[item.start_date]:{startingDay: true, color:color[i][0] , textColor: 'white', }},{[moment(item.start_date).add(j,"d").format("YYYY-MM-DD")]:{color: color[i][1], textColor: 'white'}},{[item.end_date]:{endingDay: true, color:color[i][0] , textColor: 'white'}})
        }
        if(i<4){
          i++
        }
      })

      var now=moment().format('YYYY-MM-DD');
      console.log(now)
      Object.assign(c,{[now]:{marked:true,dotColor:'red'}})
      setmarkedDates(c);
      console.log(c)
      
      
  } 
  
    return(
        <View style={{ paddingTop: 20,bottom:20, flex: 1 }}>
        <Calendar
          onDayPress={(day)=>DateSet(day)}
          markedDates={markedDates}
          markingType={'period'}

          style={{
            height:400,
            borderRadius:30,
            backgroundColor:'#1FCC79'
          }}
          theme={{
            arrowColor: 'white',
            calendarBackground: '#e2f7e8',
            textSectionTitleColor: 'white',
            textSectionTitleDisabledColor: 'gray',
            selectedDayTextColor: 'white',
            monthTextColor: 'white',
            todayTextColor: '#00adf5',
  
          }}
         />
        </View>
    )
}


export default Calender;
