import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HealthAndWellbeingStackParamList } from './NavigationTypes';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import RoutineScreen from '../screens/RoutineScreen/RoutineScreen';
import ArticleListScreen from '../screens/ArticleListScreen/ArticleListScreen';
import ArticleDetailsScreen from '../screens/ArticleDetailsScreen/ArticleDetailsScreen';
import { COLORS } from '../../../constants/theme';
import NutritionTipsScreen from '../screens/NutritionTipsScreen/NutritionTipsScreen';

const Stack = createStackNavigator<HealthAndWellbeingStackParamList>();

const HealthAndWellbeingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          color: COLORS.primary,
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: 'Well-being Home' }}
      />
      <Stack.Screen
        name="Routine"
        component={RoutineScreen}
        options={{ headerTitle: 'Daily Routines' }}
      />
      <Stack.Screen
        name="NutritionTips"
        component={NutritionTipsScreen}
        options={{ headerTitle: 'Nutrition Tips' }}
      />
      <Stack.Screen
        name="ArticleList"
        component={ArticleListScreen}
        options={{ headerTitle: 'Articles' }}
      />
      <Stack.Screen
        name="ArticleDetails"
        component={ArticleDetailsScreen}
        options={{ headerTitle: 'Article Details' }}
      />
    </Stack.Navigator>
  );
};

export default HealthAndWellbeingNavigator;
