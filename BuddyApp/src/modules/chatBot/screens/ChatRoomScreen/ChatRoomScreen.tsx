import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import {
  fetchChatMessages,
  createNewChat,
  createNewMessage,
} from "../../services/chatService";

type Message = {
  role: string;
  prompt: string;
};

const ChatroomScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { chatId: initialChatId, isNewChat } = route.params;
  const [chatId, setChatId] = useState(initialChatId || null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(!isNewChat);
  const [loading, setLoading] = useState(false); // Loading state

  const userId = "675054a2ca2d2c913f884783"; // Replace with dynamic userId

  const fetchMessages = async () => {
    try {
      if (!chatId) return;

      const response = await fetchChatMessages(chatId, userId);
      if (response.messages) {
        setMessages(response.messages);
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      Alert.alert("Error", "Unable to fetch messages.");
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setLoading(true); // Start loading

    try {
      let response;
      if (!chatId) {
        // New chat creation
        response = await createNewChat(userId, inputText);
        setChatId(response.chatId);
      } else {
        // Send a new message in an existing chat
        response = await createNewMessage(chatId, userId, inputText);
      }

      const newMessages = [
        ...messages,
        { role: "user", prompt: inputText },
        { role: "assistant", prompt: response.reply },
      ];

      setMessages(newMessages);
      setInputText("");
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Unable to send message.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const initializeNewChat = () => {
    const baseMessage =
      "Olá, sou sua assistente pessoal para ajudar você com qualquer tipo de problema que você possa ter com seus animais de estimação. Como posso ajudar você hoje?";

    setMessages([{ role: "assistant", prompt: baseMessage }]);
    setIsInputDisabled(false);
  };

  useEffect(() => {
    if (isNewChat) {
      initializeNewChat();
    } else {
      fetchMessages();
    }
  }, [isNewChat]);

  const handleBackNavigation = () => {
    if (isNewChat) {
      Alert.alert(
        "Exit Chat",
        "If you leave this screen, you won't be able to continue this conversation. Are you sure?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Leave", onPress: () => navigation.goBack() },
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={handleBackNavigation}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      ),
    });
  }, [isNewChat]);

  return (
    <View style={styles.container}>
      {/* Chat Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.role === "user"
                ? styles.userMessage
                : styles.assistantMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.prompt}</Text>
          </View>
        )}
      />

      {/* Loading Indicator */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E90FF" />
        </View>
      )}

      {/* Input Section */}
      {!isInputDisabled && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type your message..."
            editable={!loading} // Disable input while loading
          />
          <TouchableOpacity
            style={[styles.sendButton, loading && styles.sendButtonDisabled]} // Disable send button visually
            onPress={handleSendMessage}
            disabled={loading} // Disable send button functionality
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messageBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
    alignSelf: "flex-start",
  },
  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  assistantMessage: {
    backgroundColor: "#F1F1F1",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: "#ccc", // Greyed-out when disabled
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  backButton: {
    color: "#1E90FF",
    fontSize: 16,
    paddingLeft: 10,
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default ChatroomScreen;
