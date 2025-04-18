import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // Ensure the screen reloads when navigated back
import { fetchChatList } from "../../services/chatService";
import styles from "./ChatHistoryScreen.style";

interface Chat {
  chatId: string;
  title: string;
  createdAt: string;
}

/**
 * Component for the chat history screen.
 * Fetches the chat history from the backend, and displays a list of past chats.
 * Also provides a button to start a new chat.
 *
 * @param navigation - The navigation object, needed to navigate to the chat room screen.
 *
 * @returns A JSX element containing the chat history list and a button to start a new chat.
 */
const ChatHistoryScreen = ({ navigation }: { navigation: any }) => {
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches chat history from the backend.
   */
  const loadChatHistory = async () => {
    setLoading(true);
    try {
      const data = await fetchChatList();
      setChatHistory(data);
    } catch (error) {
      console.error("Failed to fetch chat history", error);
      Alert.alert("Error", "Failed to load chat history. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  /**
   * Reload chat history whenever the screen is focused.
   */
  useFocusEffect(
    useCallback(() => {
      loadChatHistory();
    }, [])
  );

  /**
   * Navigates to the new chat screen.
   */
  const handleNewChat = useCallback(() => {
    navigation.navigate("ChatRoom", { isNewChat: true });
  }, [navigation]);

  /**
   * Opens a specific chat room based on the chat ID.
   *
   * @param chatId - The ID of the chat to open.
   */
  const handleOpenChat = useCallback((chatId: string) => {
    navigation.navigate("ChatRoom", { isNewChat: false, chatId });
  }, [navigation]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1E90FF" />
      ) : chatHistory.length === 0 ? (
        <Text style={styles.noChatsText}>Nenhum histórico de chat disponível.</Text>
      ) : (
        <FlatList
          data={chatHistory}
          keyExtractor={(item) => item.chatId}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.chatItem} onPress={() => handleOpenChat(item.chatId)}>
              <Text style={styles.chatTitle}>{item.title}</Text>
              <Text style={styles.chatDate}>{new Date(item.createdAt).toLocaleString("PT-PT")}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
        <Text style={styles.newChatButtonText}>Iniciar Novo Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChatHistoryScreen;
