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

  let Trial=props.project.status=='trial'?true:flase;
  const [TrialDay,setTrialDay]=useState()
  const [markedDates,setmarkedDates]=useState()
  const [CalenderDay,SetCalendderDay]=useState([
    {start_date:'2021-04-05', date1:'', date2:'', date3:'', end_date:'2021-04-09'},
    {start_date:'2021-04-12', date1:'', date2:'', date3:'', end_date:'2021-04-16'},
    {start_date:'2021-04-19', date1:'', date2:'', date3:'', end_date:'2021-04-20'},
    {start_date:'2021-04-23', date1:'', date2:'', date3:'', end_date:'2021-04-28',title:'1.유리수와정수 '},  
  ])


  
  const TrialColor=['#cd0032','#f4583c'];
  

  function DateSet(){
      var c={}
      if(Trial==true){
        

        var Created_Day=moment(props.project.created_at).format("YYYY-MM-DD")
        console.log(Created_Day)
        var Today=moment().format("YYYY-MM-DD")
        var ending_day=moment(Created_Day).add(props.project.project.experience_period,'days').format("YYYY-MM-DD");
        console.log(ending_day)
        console.log(props.project.project.experience_period)

        for(let j=1;j<=props.project.project.experience_period;j++){
          Object.assign(c,{[Created_Day]:{startingDay: true, color:TrialColor[0] , textColor: 'white', }},{[moment(Created_Day).add(j,"d").format("YYYY-MM-DD")]:{color: TrialColor[1], textColor: 'white'}},{[ending_day]:{endingDay: true, color:TrialColor[0] , textColor: 'white', }})
        }
        
        setmarkedDates(c);  
      }
      else if(props.plans==null)
      {
        console.log("null")
      }
      else{
        const color=[['#50cebb','#70d7c7'],['#5C7210','#A3C821'],['#EFA519','#C8880E'],['#049413','#09CD1D']];

        let i=0;
        console.log('여긴 캘린더')
        console.log(props)
        
        var Plan=props.plans.options
        console.log(Plan)
        
        Plan.map((item)=>{
        
        item.start_at=moment(item.start_at).add(1,'days')
        var start_date=moment(item.start_at).format("YYYY-MM-DD")
        var end_date=moment(item.end_at).format("YYYY-MM-DD")
        
      
        for(let j=0;j<Object.keys(props.plans.options).length;j++){
          Object.assign(c,{[start_date]:{startingDay: true, color: color[i][0] , textColor: 'white', }},{[moment(start_date).add(j,"d").format("YYYY-MM-DD")]:{ color: color[i][1], textColor: 'white'}},{[end_date]:{endingDay: true, color: color[i][0], textColor: 'white'}})    
        }
        if(i<3){
          i++
        }
        else{
          i=0;
        }
           
       })
       var now=moment().format('YYYY-MM-DD');
       console.log(now)
       Object.assign(c,{[now]:{marked:true,dotColor:'red'}})
       console.log(c)
       setmarkedDates(c);
       }  
      
  } 

  useEffect(()=>{
    DateSet()
  },[props])
  
    return(
        <View style={{ paddingTop: 20,bottom:20, flex: 1 }}>
        <Calendar
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
