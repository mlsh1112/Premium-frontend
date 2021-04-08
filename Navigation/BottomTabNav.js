import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../Screen/Main/Home';
import Search from '../Screen/Main/Search';
import Authentication from '../Screen/Main/Authentication';
import Profile from '../Screen/Main/Profile';
import createProjectStackNav from './CreateProjectStackNav';
import ProjectNavi from './ProjectNavigation';
import AuthNamvi from './AuthNavigation';

const TabNavigator = createBottomTabNavigator();

export default function Tabnavigation(){
    return (
        <TabNavigator.Navigator initialRouteName='Home'>
            <TabNavigator.Screen name="Home" component={ProjectNavi} options={{
                                tabBarLabel: 'Home',
                                tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
            <TabNavigator.Screen name="Search" component={Search} options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" color={color} size={26} />
          ),
        }}
      />
            <TabNavigator.Screen name="Authentication" component={AuthNamvi} options={{
          tabBarLabel: 'Authentication',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="checkbox-marked-outline" color={color} size={26} />
          ),
        }}
      />
            <TabNavigator.Screen name="Profile" component={createProjectStackNav} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={26} />
          ),
        }}
      />
        </TabNavigator.Navigator>
    );
} 
  