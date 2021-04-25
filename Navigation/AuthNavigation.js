import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Authentication from '../Screen/Main/Authentication';
import TutorAuthentication from '../Screen/AuthenticationScreen/TutorAuthentication';
import TutorAuthCheck from '../Screen/AuthenticationScreen/TutorAuthCheck';
import TuteeAuthentication from '../Screen/AuthenticationScreen/TuteeAuthentication'
import AuthPayBack from '../Screen/AuthenticationScreen/AuthPayBack';
import ExperiencedAuth from '../Screen/AuthenticationScreen/ExperiencedAuth'
import ProjectDetail from '../src/components/ProjectDetail'
const StackForAuth = createStackNavigator();

export default function createProjectStackNav(){
    return (
        <StackForAuth.Navigator initialRouteName='Authentication'>
            <StackForAuth.Screen name="Authentication" component={Authentication} options={{headerShown: false}} />
            <StackForAuth.Screen name="TutorAuthentication" component={TutorAuthentication}/>
            <StackForAuth.Screen name="TutorAuthCheck" component={TutorAuthCheck} options={{headerTitle: 'Tutee 인증 내용'}}/>
            <StackForAuth.Screen name="TuteeAuthentication" component={TuteeAuthentication}/>
            <StackForAuth.Screen name="AuthPayBack" component={AuthPayBack} options={{headerShown: false}} />
            <StackForAuth.Screen name="ProjectDetail" component={ProjectDetail} />
        </StackForAuth.Navigator>
    );
}

