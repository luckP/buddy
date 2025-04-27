import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GalleryScreen from "../screens/GalleryScreen/GalleryScreen";
import CreateImageScreen from "../screens/CreateImageScreen/CreateImageScreen";
import { AiImageGeneratorStackParamList } from "./NavigationTypes";
import { COLORS } from "../../../constants/theme";

const Stack = createStackNavigator<AiImageGeneratorStackParamList>();

const AiImageNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { color: COLORS.primary },
        headerTintColor: COLORS.primary,
      }}
    >
      <Stack.Screen
        name="Gallery"
        component={GalleryScreen}
        options={{ headerTitle: "Galeria de Imagens" }}
      />
      <Stack.Screen
        name="CreateImage"
        component={CreateImageScreen}
        options={{ headerTitle: "Criar Nova Imagem" }}
      />
    </Stack.Navigator>
  );
};

export default AiImageNavigator;
