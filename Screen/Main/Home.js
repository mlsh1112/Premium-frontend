import React, { Component, useState} from 'react';
import RNPickerSelect from 'react-native-picker-select';
import Projectcard from '../../src/components/Projectcard';
import {getprojects} from '../../src/Api'
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
  } from 'react-native';
import { FlatList } from 'react-native';

class Home extends Component {
    state={
        subject:'',
        projects:[]
    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        getprojects()
        .then(res=>{
            console.log(res.data)
            this.setState({
                projects: res.data
            })
        }).catch(err=>
            console.log(err)
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textposition}>따 숲</Text>
                <View style={styles.pickerstyle}>
                    <RNPickerSelect 
                        placeholder={{ label: '과목 전체', value: 'all' }}
                        onValueChange={(value) => this.setState({subject:value})}
                        items={[
                            { label: '국어', value: 'korean' },
                            { label: '영어', value: 'english' },
                            { label: '수학', value: 'math' },
                       ]}
                /></View>
               <View style={styles.bar}>
                   
               </View>
                <FlatList
                ListHeaderComponent={
                    <View>
                        {this.state.projects.map(project=>{
                           return <Projectcard 
                           navigation={this.props.navigation}
                           data={project}/>
                        })}
                    </View>
                }
                />
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex : 1,
        justifyContent:'center',
    },
    textposition:{
        marginTop:70,
        marginLeft:30,
        fontSize:30,
        fontWeight:'bold'
    },
    pickerstyle:{
        margin:30,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingRight: 30,
    },
    bar: {
        flex:1,
        marginTop:10,
        position: 'absolute',
        width: '100%',
        height: 5,
        left: 0,
        top: 179,
        backgroundColor: '#ced4da'
      }
  });

export default Home;