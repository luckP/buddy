import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommentScreen from '../screens/CommentScreen/CommentScreen';
import CreatePost from '../screens/CreatePostScreen/CreatePostScreen';
import FeedScreen from '../screens/FeedScreen/FeedScreen';
import SocialProfile from '../screens/SocialProfileScreen/SocialProfileScreen';
import { SocialMediaStackParamList } from './NavigationTypes';
import { COLORS } from '../../../constants/theme';

const Stack = createStackNavigator<SocialMediaStackParamList>();

const SocialMediaStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleStyle: { color: COLORS.primary},
                headerTintColor: COLORS.primary,
        }}
        >
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
