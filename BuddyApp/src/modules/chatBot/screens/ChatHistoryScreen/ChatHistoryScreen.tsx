import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; // ✅ Ensure the screen reloads when navigated back
import { fetchChatList } from "../../services/chatService";
import styles from "./ChatHistoryScreen.style";

const ChatHistoryScreen = ({ navigation }: { navigation: any }) => {
  const [chatHistory, setChatHistory] = useState<any[]>([]);
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

  const handleNewChat = () => {
    navigation.navigate("ChatRoom", { isNewChat: true });
  };

  const handleOpenChat = (chatId: string) => {
    navigation.navigate("ChatRoom", { isNewChat: false, chatId });
  };

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
