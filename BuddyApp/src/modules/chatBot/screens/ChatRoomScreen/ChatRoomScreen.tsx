import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { fetchChatMessages, createNewChat, createNewMessage } from "../../services/chatService";
import IaChatMessage from "../../../../models/IaChatMessage";

const ChatroomScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { chatId: initialChatId, isNewChat } = route.params;
  const [chatId, setChatId] = useState<string | null>(initialChatId || null);
  // const [messages, setMessages] = useState<IaChatMessage[]>([]);
  const [messages, setMessages] = useState<IaChatMessage[]>(Array(100).fill(null).map((_, i) => ({ role: "user", prompt: "test new message" + i})));
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(!isNewChat);

  const flatListRef = useRef<FlatList<IaChatMessage>>(null); // ✅ For auto-scroll


  /**
   * Fetch chat messages from the backend.
   */
  const fetchMessages = useCallback(async () => {
    if (!chatId) return;
    try {
      const chatMessages = await fetchChatMessages(chatId);
      setMessages(chatMessages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      Alert.alert("Erro", "Não foi possível carregar as mensagens.");
    }
  }, [chatId]);

  /**
   * Sends a message and updates the UI when the response arrives.
   */
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setLoading(true);

    try {
      let response;
      let newChatId = chatId;
      const updatedMessages: IaChatMessage[] = [...messages];

      const userMessage: IaChatMessage = { role: "user", prompt: inputText };
      updatedMessages.push(userMessage);

      // Update UI with user's message
      setMessages(updatedMessages);

      if (!chatId) {
        response = await createNewChat(inputText);
        newChatId = response.chatId;
        setChatId(newChatId);
      } else {
        response = await createNewMessage(chatId, inputText);
      }

      setInputText("");

      if (response.reply) {
        const assistantMessage: IaChatMessage = { role: "assistant", prompt: response.reply };
        updatedMessages.push(assistantMessage);

        // Append AI response while keeping all previous messages
        setMessages(updatedMessages);
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Erro", "Não foi possível enviar a mensagem.");
    } finally {
      setLoading(false);
      // ✅ Scroll to the latest message when assistant responds
      
    }
  };

  /**
   * Initializes a new chat session with a stored AI response.
   */
  useEffect(() => {
    if (isNewChat) {
      // setMessages([{ role: "assistant", prompt: "Olá! Como posso ajudar com seu animal de estimação hoje?" }]);
    } else {
      fetchMessages();
    }
  }, [isNewChat, fetchMessages]);

  /**
   * Prevents sending messages if chat is closed.
   */
  useEffect(() => {
    if (chatId && !isNewChat) {
      setIsReadOnly(true);
    }
  }, [chatId]);


  const screollEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{backgroundColor: 'red', padding: 30}} onPress={screollEnd}>
          <Text>Press Here to test screoll</Text>
        </TouchableOpacity>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={[styles.messageBubble, item.role === "user" ? styles.userMessage : styles.assistantMessage]}>
            <Text style={styles.messageText}>{item.prompt}</Text>
          </View>
        )}
      />

      {loading && <ActivityIndicator size="large" color="#1E90FF" style={styles.loadingIndicator} />}

      {/* Disable input if chat is closed */}
      {!isReadOnly && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Escreva sua mensagem..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={loading}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChatroomScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  messageBubble: { marginVertical: 5, padding: 10, borderRadius: 10, maxWidth: "80%" },
  userMessage: { backgroundColor: "#DCF8C6", alignSelf: "flex-end" },
  assistantMessage: { backgroundColor: "#F1F1F1" },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: "row", padding: 10, borderTopWidth: 1, borderTopColor: "#ccc" },
  textInput: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginRight: 10 },
  sendButton: { backgroundColor: "#1E90FF", padding: 10, borderRadius: 8 },
  sendButtonDisabled: { backgroundColor: "#ccc" },
  sendButtonText: { color: "#fff", fontWeight: "bold" },
  backButton: { color: "#1E90FF", fontSize: 16, paddingLeft: 10 },
  loadingIndicator: { marginVertical: 20 },
});
