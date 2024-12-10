import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatHistoryScreen from "../screens/ChatHistoryScreen/ChatHistoryScreen";
import ChatRoomScreen from "../screens/ChatRoomScreen/ChatRoomScreen";
import { ChatBotStackParamList } from "./NavigationTypes";

const Stack = createStackNavigator<ChatBotStackParamList>();

const ChatBotStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChatHistory"
        component={ChatHistoryScreen}
        options={{ headerTitle: "Chat History" }}
      />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={{ headerTitle: "Chat Room" }}
      />
    </Stack.Navigator>
  );
};

export default ChatBotStack;
