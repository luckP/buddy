import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen/ExploreScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import FriendsScreen from '../screens/FriendsScreen/FriendsScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MainTabParamList } from './NavigationTypes';

const Tab = createBottomTabNavigator<MainTabParamList>(); // Pass the types here

const Menu: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="search" color={color} size={size} />,
           headerShown: false,
        }}
      />
      <Tab.Screen
        name="Message"
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="users" color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Friend"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="users" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Menu;
