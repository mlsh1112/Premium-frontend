import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../Screen/Main/Home'
import Projectcard from '../src/components/Projectcard'
import ProjectDetail from '../src/components/ProjectDetail'
import ProjectTrial from '../src/components/ProjectTrial'
import ProfileView from '../src/components/ProfileView'

const Stack = createStackNavigator();

export default function ProjectNavigation(){
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="Projectcard" component={Projectcard} options={{headerShown: false}}/>
            <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
            <Stack.Screen name="ProfileView" component={ProfileView} />
            <Stack.Screen name="ProjectTrial" component={ProjectTrial} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
}

