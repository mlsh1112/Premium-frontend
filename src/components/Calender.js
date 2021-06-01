const moment = require("moment");
import React, { Component } from 'react';
import {Calendar,} from 'react-native-calendars';
import {
    View,
    Text,
  } from 'react-native';
import {Card} from 'react-native-paper'
import { useEffect,useState } from 'react';
function Calender(props){
  let Trial=props.project.status==='trial'?true:false;
  const [markedDates,setmarkedDates]=useState()
  const [chapter,setchapter]=useState('')
  const [pickday,setpickday]=useState()
  const DateSet=()=>{
      var days={}
      var now=moment().format('YYYY-MM-DD');
      if(!props.plans)
      {
        console.log("null")
      }
      else{
        console.log(props.plans)
        let Plans=props.plans
        const color=[['#FECCBE','#FD8A69'],['#FEEBB6','#FFCD4A'],['#DDECCA','#AFD485'],['#CCD2F0','#9FA9D8']];
        let colorpick=0;
        let experience_period=props.project.project.experience_period
        let duringDay=0
        Plans.map((item)=>{
          console.log(item)
            colorpick++
            var start_date=moment(item.start_at).format("YYYY-MM-DD")
            var end_date=moment(item.end_at).format("YYYY-MM-DD")
            
            var date_start=moment(item.start_at);
            var date_end=moment(item.end_at);
            var PalnDays=date_end.diff(date_start,'days')

            console.log(duringDay)
            if(Trial){
              var PalnDays=experience_period
              if(duringDay>= experience_period){}
              else{
                if(PalnDays==0){
                  Object.assign(days,{[start_date]:{disabled: true, startingDay: true, color: color[colorpick%color.length][1], endingDay: true , textColor: 'black'}})      
                }
                else{
                    for(let j=1;j<=PalnDays;j++){ 
                      Object.assign(days,{[start_date]:{startingDay: true, color: color[colorpick%color.length][0] , textColor: 'black', }},{[moment(start_date).add(j,"d").format("YYYY-MM-DD")]:{ color: color[colorpick%color.length][1], textColor: 'gray'}},{[moment(start_date).add(experience_period,"d").format("YYYY-MM-DD")]:{endingDay: true, color: color[colorpick%color.length][0], textColor: 'black'}})    
                    }
                }
              }
            }
            else{
              var PalnDays=date_end.diff(date_start,'days')
              if(PalnDays==0){
                Object.assign(days,{[start_date]:{disabled: true, startingDay: true, color: color[colorpick%color.length][1], endingDay: true , textColor: 'black'}})      
              }
              else{
                  for(let j=1;j<=PalnDays;j++){ 
                    Object.assign(days,{[start_date]:{startingDay: true, color: color[colorpick%color.length][0] , textColor: 'black', }},{[moment(start_date).add(j,"d").format("YYYY-MM-DD")]:{ color: color[colorpick%color.length][1], textColor: 'gray'}},{[end_date]:{endingDay: true, color: color[colorpick%color.length][0], textColor: 'black'}})    
                  }
              }
            }

            duringDay+=PalnDays
        })
       setmarkedDates(days);

      }
  } 

  const checkPlan=(day)=>{

    console.log(props.plan)
    let Plans=props.plans
    var date=moment(day.dateString);
    let duringDay=0
    setpickday(day)
    var isplan=false
    Plans.map(plan=>{
      let difStart = date.diff(moment(plan.start_at),'days')
      let difEnd = date.diff(moment(plan.end_at),'days')
      duringDay += moment(plan.end_at).diff(moment(plan.start_at),'days')
      let experience_period=props.project.project.experience_period
      if(Trial){
          if(duringDay===experience_period){
            if(difStart>=0 && difEnd <=0){
              setchapter(plan.chapter.title)
              isplan=true
              }
          }
      }
      else{
         if(difStart>=0 && difEnd <=0){
        setchapter(plan.chapter.title)
        isplan=true
        }
      }
    })

    if(!isplan) setchapter('')
  }
  useEffect(()=>{
    DateSet()
  },[props])
    return(
        <View style={{  paddingTop: 20,bottom:20, flex: 1 }}>
        <Calendar
          markedDates={markedDates}
          markingType={'period'}
          style={{borderRadius:25, height:350}}
          onDayPress={(day) => {checkPlan(day)}}
          theme={{
            todayTextColor: 'skyblue',
          }}
         />
         {
           chapter ?
           <Card style={styles.cardPosition}>
             <Text>{pickday.year}년 {pickday.month}월 {pickday.day}일의 일정 😎</Text>
           <Text style={styles.planTxt}>{chapter}</Text>
           </Card>
           :
           <Text></Text>
         }
         
        </View>
    )
}

const styles = {
  cardPosition:{
    marginTop:20,
    padding:20
  },
  planTxt:{
    fontWeight:'bold',
    fontSize:20,
    margin:8
  }
}
export default Calender;
