import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import FeedScreen from '../screens/FeedScreen/FeedScreen';
import { SocialMediaStackParamList } from './NavigationTypes';
import CommentScreen from '../screens/CommentScreen/CommentScreen';
import CreatePost from '../screens/CreatePostScreen/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import SocialProfile from '../screens/SocialProfileScreen/SocialProfileScreen';

const Stack = createStackNavigator<SocialMediaStackParamList>();

const SocialMediaStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Feed"
                component={FeedScreen}
                options={{ headerTitle: 'Social Media Feed' }}
            />
            <Stack.Screen
                name="Comments"
                component={CommentScreen}
                options={{ headerTitle: 'Social Media Feed' }}
            />
            <Stack.Screen
                name="CreatePost"
                component={CreatePost}
                options={{ headerTitle: 'Social Media Feed' }}
            />
            <Stack.Screen
                name="SocialProfile"
                component={SocialProfile}
                options={{ headerTitle: 'Social Media Feed' }}
                />
            
        </Stack.Navigator>
    );
};

export default SocialMediaStack;
