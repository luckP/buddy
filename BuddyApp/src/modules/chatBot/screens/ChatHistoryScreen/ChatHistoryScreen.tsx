import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { fetchChatList } from "../../services/chatService";
import { useFocusEffect } from "@react-navigation/native";

const ChatHistoryScreen = ({ navigation }: { navigation: any }) => {
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = "675054a2ca2d2c913f884783"; // Replace with actual user ID

  const loadChatHistory = async () => {
    setLoading(true); // Start loading
    try {
      const data = await fetchChatList(userId);
      setChatHistory(data);
    } catch (error) {
      console.error("Failed to fetch chat history", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // Reload chats whenever the screen is focused
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
      ) : (
        <>
          {chatHistory.length === 0 ? (
            <Text style={styles.noChatsText}>No chat history available.</Text>
          ) : (
            <FlatList
              data={chatHistory}
              keyExtractor={(item) => item.chatId} // Use `chatId` as the unique key
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.chatItem}
                  onPress={() => handleOpenChat(item.chatId)} // Pass `chatId` to ChatRoom
                >
                  <Text style={styles.chatTitle}>{item.title}</Text>
                  <Text style={styles.chatDate}>
                    {new Date(item.createdAt).toLocaleString("PT-PT")}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </>
      )}
      <TouchableOpacity style={styles.newChatButton} onPress={handleNewChat}>
        <Text style={styles.newChatButtonText}>Start New Chat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  noChatsText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginTop: 20,
  },
  chatItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatDate: {
    fontSize: 14,
    color: "gray",
  },
  newChatButton: {
    marginTop: 20,
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  newChatButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ChatHistoryScreen;
