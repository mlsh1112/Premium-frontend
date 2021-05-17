import React, { Component } from 'react';
import {Calendar,CalenderList,Agenda, CalendarList} from 'react-native-calendars';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    ScrollView,
    Text,
} from 'react-native';
import { useState,useEffect } from 'react';
import colors from '../../src/colors'

const moment = require("moment");

function PreviewCalendar(props){
  console.log('=================schedule=================')
  console.log(props.schedule)
  console.log('==========================================')
  
  const [markedDates,setmarkedDates]=useState()
  const [agenda,setAgenda] = useState()

  const color=[['#50cebb','#70d7c7'],['#5C7210','#A3C821'],['#EFA519','#C8880E'],['#049413','#09CD1D']];

  useEffect(()=>{
    var tempschedule={}
    var tempagenda={}
    props.schedule.map((item,index)=>{
        const colorIndex = index % 4 
        const startDate = moment(item.start_at)
        var endDate = moment(item.end_at)
        if( item.holiday ==='holiday'){
            endDate = endDate.subtract(1,'days')
        }
        const subnum = endDate.diff(startDate,'days')
        for(let j=1;j<=subnum;j++){
          Object.assign(tempagenda,
            {[startDate.format("YYYY-MM-DD")]:[{title: props.chapters[index].title}]},
            {[moment(startDate).add(j,"d").format("YYYY-MM-DD")]:[{title: props.chapters[index].title}]},
            {[endDate.format("YYYY-MM-DD")]:[{title: props.chapters[index].title}]}
          )
          Object.assign(tempschedule,
            {[startDate.format("YYYY-MM-DD")]:{startingDay: true, color: color[colorIndex][0] , textColor: 'white'}},
            {[moment(startDate).add(j,"d").format("YYYY-MM-DD")]:{color: color[colorIndex][1], textColor: 'white'}},
            {[endDate.format("YYYY-MM-DD")]:{endingDay: true, color:color[colorIndex][0] , textColor: 'white'}}
          )
        }
      })
      setmarkedDates(tempschedule);
      setAgenda(tempagenda)
  },[])

  const showchapter=(item)=>{
    return (
        <View style={styles.itemContainer}>
          <Text>{item.title}</Text>
        </View>
      );
  } 

  return(
      <View style={{ paddingVertical:20, flex: 1,width:'100%',alignItems:'center' }}>
      <Agenda
        selected={moment(props.schedule[0].start_at).format("YYYY-MM-DD")}
        items={agenda}
        onDayPress={(day)=>console.log(day)}
        markedDates={markedDates}
        markingType={'period'}
        renderItem={showchapter}
        style={styles.calendarstyle}
        theme={{
          arrowColor: 'white',
          calendarBackground: '#e2f7e8',
          textSectionTitleColor: 'black',
          textSectionTitleDisabledColor: 'gray',
          selectedDayTextColor: '#D050C5',
          monthTextColor: 'black',
          todayTextColor: '#00adf5',
          agendaKnobColor: 'black',
          agendaTodayColor: 'red',
        }}
       />
      </View>
  )
}

const styles = StyleSheet.create({
    calendarstyle: {
        width: 360,
        height:450,
        borderRadius:30,
        backgroundColor:colors.subcolor,
    },
    itemContainer: {
        backgroundColor: "#9BE1C2",
        margin: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});
    
export default PreviewCalendar;
