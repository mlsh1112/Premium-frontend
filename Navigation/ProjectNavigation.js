import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screen/Main/Home'
import Projectcard from '../src/components/Projectcard'
import ProjectDetail from '../src/components/ProjectDetail'
import ProjectTrial from '../src/components/ProjectTrial'
import ProfileView from '../src/components/ProfileView'
import ProjectMini from '../src/components/ProjectMini'
import CardNews from '../src/components/CardNews'
<<<<<<< HEAD
import Modifyprofile from '../src/components/Modifyprofile'
=======
import UpdateProject from '../Screen/UpdateProject/UpdateProject'
import MyLike from '../src/components/MyLike'
import Book from '../Screen/makeProjectScreen/Book'
import Chapter from '../Screen/makeProjectScreen/Chapter'
>>>>>>> 23a8199d51a41b742daf4b5d4bf88f35b2f55323
const Stack = createStackNavigator();

export default function ProjectNavigation(){
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="Projectcard" component={Projectcard} options={{headerShown: false}}/>
            <Stack.Screen name="ProjectDetail" component={ProjectDetail} options={{headerTitle: '프로젝트 상세보기',headerTitleStyle: {fontWeight: 'bold'}}}/>
            <Stack.Screen name="ProfileView" component={ProfileView} options={{headerTitle: '튜터 프로필',headerTitleStyle: {fontWeight: 'bold'}}}/>
            <Stack.Screen name="ProjectMini" component={ProjectMini} options={{headerShown: false}}/>
            <Stack.Screen name="Modifyprofile" component={Modifyprofile} options={{headerShown: false}}/>
            <Stack.Screen name="ProjectTrial" component={ProjectTrial} options={{headerShown: false}}/>
            <Stack.Screen name="CardNews" component={CardNews} options={{headerShown: false}} />
            <Stack.Screen name="UpdateProject" component={UpdateProject} options={{headerTitle: '프로젝트 업데이트',headerTitleStyle: {fontWeight: 'bold'}}}/>
            <Stack.Screen name="Book" component={Book} options={{headerTitle: "책 선택",headerTitleStyle: {fontWeight: 'bold'}}}/>
            <Stack.Screen name="Chapter" component={Chapter} options={{headerTitle: "챕터 가중치 설정",headerTitleStyle: {fontWeight: 'bold'}}}/>
            <Stack.Screen name="MyLike" component={MyLike} options={{headerTitle: '좋아요 리스트',headerTitleStyle: {fontWeight: 'bold'}}} />
        </Stack.Navigator>
        
    );
}

