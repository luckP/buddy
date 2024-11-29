import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CommentScreen from '../../socialMedia/screens/CommentScreen/CommentScreen';
import LostFoundMainScreen from '../screens/LostFoundMainScreen/LostFoundMainScreen';
import { LostAndFoundPetLocatorStackParamList } from './NavigationTypes';

const Stack = createStackNavigator<LostAndFoundPetLocatorStackParamList>();

const LostAndFoundPetLocatorStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="LostPets"
                component={LostFoundMainScreen}
                options={{ headerTitle: 'Lost Pets' }}
            />
            
        </Stack.Navigator>
    );
};

export default LostAndFoundPetLocatorStack;
