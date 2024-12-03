import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { COLORS } from '../../../constants/theme';
import LostFoundMainScreen from '../screens/LostFoundMainScreen/LostFoundMainScreen';
import ReportLostPet from '../screens/ReportLostPet/ReportLostPet';
import { LostAndFoundPetLocatorStackParamList } from './NavigationTypes';

const Stack = createStackNavigator<LostAndFoundPetLocatorStackParamList>();

const LostAndFoundPetLocatorStack = () => {
    return (
        <Stack.Navigator
        screenOptions={{
            headerTitleStyle: { color: COLORS.primary},
            headerTintColor: COLORS.primary,
        }}
        >
            <Stack.Screen
                name="LostPets"
                component={LostFoundMainScreen}
                options={{ headerTitle: 'Lost Pets' }}
            />
            <Stack.Screen
                name="CreatePost"
                component={ReportLostPet}
                options={{ headerTitle: 'Lost Pets' }}
            />
            
        </Stack.Navigator>
    );
};

export default LostAndFoundPetLocatorStack;
