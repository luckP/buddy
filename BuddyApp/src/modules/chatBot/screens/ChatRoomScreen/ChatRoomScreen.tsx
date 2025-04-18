import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { fetchChatMessages, createNewChat, createNewMessage } from "../../services/chatService";
import IaChatMessage from "../../../../models/IaChatMessage";
import { ChatRole } from "../../../../models/ChatRole";
import styles from "./ChatRoomScreen.style";
import { IA_PROMPT_TEXT } from "../../constants/iaPromptText";
import { COLORS } from "../../../../constants/theme";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";


const ChatroomScreen = ({ route }: { route: any; navigation: any }) => {
  const { chatId: initialChatId, isNewChat } = route.params;
  const [chatId, setChatId] = useState<string | null>(initialChatId || null);
  const [messages, setMessages] = useState<IaChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(!isNewChat);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);


  const flatListRef = useRef<FlatList<IaChatMessage>>(null);

  const insets = useSafeAreaInsets();



  /**
   * Fetch chat messages from the backend.
   */
  const fetchMessages = useCallback(async () => {
    if (!chatId) return;
    try {
      const chatMessages = await fetchChatMessages(chatId);
      setMessages(chatMessages);
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      Alert.alert("Erro", "Não foi possível carregar as mensagens.");
    }
  }, [chatId]);

  /**
   * Sends a message and updates the UI when the response arrives.
   */
  const handleSendMessage = async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) {
      return;
    }

    setLoading(true);

    try {
      const updatedMessages = addUserMessage(trimmedInput);
      clearInput();

      const newChatId = await getOrCreateChatId(chatId, trimmedInput);
      setChatId(newChatId);

      const response = await createNewMessage(newChatId, trimmedInput);

      if (response?.reply) {
        addAssistantReply(response.reply, updatedMessages);
      }

    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Erro', 'Não foi possível enviar a mensagem.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Adds a user message to the chat messages.
   *
   * @param prompt - The message text.
   * @returns The updated list of messages.
   */
  const addUserMessage = (prompt: string): IaChatMessage[] => {
    const userMessage: IaChatMessage = { role: ChatRole.User, prompt };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    return newMessages;
  };

  /**
   * Creates a new chat or returns the existing one.
   */
  const getOrCreateChatId = async (existingId: string | null, prompt: string): Promise<string> => {
    if (existingId) return existingId;

    const response = await createNewChat(prompt);
    return response.chatId;
  };

  /**
   * Adds the assistant's reply to the chat messages.
   *
   * @param reply - The assistant's reply.
   * @param previousMessages - The previous messages in the chat.
   */
  const addAssistantReply = (reply: string, previousMessages: IaChatMessage[]) => {
    const assistantMessage: IaChatMessage = { role: ChatRole.Assistant, prompt: reply };
    const finalMessages = [...previousMessages, assistantMessage];
    setMessages(finalMessages);
    scrollToBottom();
  };

  /**
   * Scrolls to the bottom of the chat list.
   */
  const scrollToBottom = () => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  /**
   * Clears the input field.
   */
  const clearInput = () => {
    setInputText('');
  };


  /**
   * Initializes a new chat session with a stored AI response.
   */
  useEffect(() => {
    if (isNewChat) {
      setMessages([{ role: ChatRole.Assistant, prompt: IA_PROMPT_TEXT }]);
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
  }, [chatId, isNewChat]);


  /**
   * On FlatList scroll, show or hide the scroll-to-bottom button.
   */
  const handleScroll = useCallback(({ nativeEvent }: any) => {
    const isAtBottom = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20;
    setShowScrollToBottom(!isAtBottom);
  }, []);

  return (
    <SafeAreaView 
    style={styles.safeArea}
    edges={['left', 'right', 'bottom']}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          data={messages}
          ref={flatListRef}
          keyExtractor={(_, index) => index.toString()}
          onScroll={handleScroll}
          scrollEventThrottle={100}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <View style={[
              styles.messageBubble,
              item.role === ChatRole.User ? styles.userMessage : styles.assistantMessage
            ]}>
              <Text style={styles.messageText}>{item.prompt}</Text>
            </View>
          )}
        />

        {showScrollToBottom && (
          <TouchableOpacity style={styles.scrollToBottomButton} onPress={scrollToBottom}>
            <Icon name="chevron-down" size={28} color={COLORS.white} />
          </TouchableOpacity>
        )}

        {loading && <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />}

        {(!isReadOnly || true) && (
          <View style={[styles.inputContainer,  { paddingBottom: insets.bottom || 10 }]}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Escreva sua mensagem..."
              editable={!loading}
              multiline
              numberOfLines={1}
              textAlignVertical="top"
              maxLength={200}
            />
            <TouchableOpacity style={styles.voiceButton} onPress={() => console.log('Start voice input')} disabled={loading}>
              <Icon name="mic" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={loading}>
              <Icon name="send" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatroomScreen;
