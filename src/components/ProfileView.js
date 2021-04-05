import React, { Component } from 'react';
import {  View, Image,Text,TouchableOpacity,ScrollView,Alert } from 'react-native';
import {  Card,IconButton,Colors } from 'react-native-paper';
import cat from '../../assets/cat2.png'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../components'

function ProfileView(){
    return(
        <View>
            <Card style={styles.cardStyle}>
                <View style={styles.topPosition}>
                    <View style={styles.profilePosition}> 
                        <Image source={cat} style={styles.imgStyle}></Image>
                        <View style={{flexDirection:'row',marginBottom:10}}>
                            <Text style={styles.nameStyle1}>튜터  </Text>
                            <Text style={styles.nameStyle2}> 이모씨</Text>
                        </View>

                        <View style={{flexDirection:'row',marginBottom:10}}>
                        <Icons name='school' size={20} color="#9FA5C0"></Icons>
                        <Text style={styles.schoolStyle}>아주대학교</Text>
                        </View>
                    </View>


                    <View style={{flexDirection:'row',marginTop:30}}>
                        <View style={styles.detailPosition}>
                            <Text style={styles.detailtext1}>1</Text>
                            <Text style={styles.detailtext2}>Projects</Text>
                        </View>

                        <View style={styles.detailPosition}>
                            <Text style={styles.detailtext1}>782</Text>
                            <Text style={styles.detailtext2}>Following</Text>
                        </View>

                        <View style={styles.detailPosition}>
                            <Text style={styles.detailtext1}>1</Text>
                            <Text style={styles.detailtext2}>Followers</Text>
                        </View>
                    </View>
                    <Button style={styles.buttonStyle}>Following</Button>
                </View>

            <View style={styles.bottomPosition}></View>    
            
            <View style={styles.projectPosition}>
            <Text style={styles.projectText}>Projects</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator = {true}
                style={styles.projectScroll}>
                    <Text>dddd</Text>

            </ScrollView>
            </View>
        </Card>



        </View>
    )
}

const styles={
    cardStyle:{
        width:'100%',
        height:"100%"
    },
    topPosition:{
        margin:50,
        borderColor:'#eee',
        borderBottomWidth:2,
    },
    profilePosition:{
        marginLeft:'30%',
    },
    imgStyle:{
        width: 80,
        height:80,
        borderRadius:50,
        marginBottom:20,
        marginLeft:20

    },
    nameStyle1:{
        fontWeight:'bold',
        fontSize:25,
        color:'#FF6464'
    },
    nameStyle2:{
        fontWeight:'bold',
        fontSize:25,
        color:'#3E5481'
    },
    schoolStyle:{
        fontWeight:'bold',
        fontSize:18,
        marginLeft:10,
        color:'#9FA5C0'

    },
    detailtext1:{
        fontWeight:'bold',
        color:'#3E5481',
        fontSize:20,
        marginBottom:10
    },
    detailtext2:{
        fontWeight:'bold',
        fontSize:18,
        color:'#9FA5C0',
        marginBottom:30
    },
    detailPosition:{
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    bottomPosition:{
        borderColor:'#eee',
        borderBottomWidth:5,
    },

    projectPosition:{
        margin:25
    },
    projectText:{
        fontSize:25,
        fontWeight:'bold',
        color:'#3E5481',
        marginBottom:10
    },
    projectScroll:{
        backgroundColor:'#eee',
        height:'30%',
        marginBottom:10,
        borderRadius:10
    }
}


export default ProfileView;
