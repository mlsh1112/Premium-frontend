import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProjectForm from '../Screen/makeProjectScreen/ProjectForm';
import Profile from '../Screen/Main/Profile';


const StackForCreatePrj = createStackNavigator();

export default function createProjectStackNav(){
    return (
        <StackForCreatePrj.Navigator initialRouteName='Profile'>
            <StackForCreatePrj.Screen name="Profile" component={Profile} options={{headerShown: false}}/>
            <StackForCreatePrj.Screen name="ProjectForm" component={ProjectForm}/>
        </StackForCreatePrj.Navigator>
    );
}

