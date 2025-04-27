import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/Feather';
import { COLORS } from "../../../../constants/theme";
import { ChatRole } from "../../../../models/ChatRole";
import IaChatMessage from "../../../../models/IaChatMessage";
import ChatInputBox from "../../components/ChatInputBox/ChatInputBox";
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import { IA_PROMPT_TEXT } from "../../constants/iaPromptText";
import { createNewChat, createNewMessage, fetchChatMessages } from "../../services/chatService";
import styles from "./ChatRoomScreen.style";

const ChatroomScreen = ({ route }: { route: any; navigation: any }) => {
  const { chatId: initialChatId, isNewChat } = route.params;
  const [chatId, setChatId] = useState<string | null>(initialChatId || null);
  const [messages, setMessages] = useState<IaChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(!isNewChat);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);


  const flatListRef = useRef<FlatList<IaChatMessage>>(null);

  const fetchMessages = useCallback(async () => {
    if (!chatId) return;
    try {
      const chatMessages = await fetchChatMessages(chatId);
      console.log("Fetched messages:", chatMessages);
      setMessages(chatMessages);
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      Alert.alert("Erro", "Não foi possível carregar as mensagens.");
    }
  }, [chatId]);

  const handleSendMessage = async () => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput && !selectedImage) return;
  
    setLoading(true);
  
    try {
      let response;
      let newChatId = chatId;
  
      if (!chatId) {
        response = await createNewChat(trimmedInput, selectedImage || undefined);
        newChatId = response.chatId;
        setChatId(newChatId);
      } else {
        response = await createNewMessage(chatId, trimmedInput, selectedImage || undefined);
      }
  
      // ✅ Use imageUrl returned from backend (if present)
      const returnedImageUrl = response?.imageUrl || null;
  
      const updatedMessages = addUserMessage(trimmedInput, returnedImageUrl);
      clearInput();
      setSelectedImage(null);
  
      if (response?.reply) {
        addAssistantReply(response.reply, updatedMessages);
      }
  
    } catch (error) {
      console.error("Error sending message:", error);
      setSelectedImage(null);
      Alert.alert("Erro", "Não foi possível enviar a mensagem.");
    } finally {
      setLoading(false);
    }
  };
  


  const addUserMessage = (prompt: string, imageUrl?: string | null): IaChatMessage[] => {
    const userMessage: IaChatMessage = {
      role: ChatRole.User,
      prompt,
      date: new Date(),
      imageUrl: imageUrl || '',
    };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    return newMessages;
  };

  const getOrCreateChatId = async (existingId: string | null, prompt: string): Promise<string> => {
    if (existingId) return existingId;
    const response = await createNewChat(prompt);
    return response.chatId;
  };

  const addAssistantReply = (reply: string, previousMessages: IaChatMessage[]) => {
    const assistantMessage: IaChatMessage = { role: ChatRole.Assistant, prompt: reply, date: new Date(), imageUrl: '' };
    const finalMessages = [...previousMessages, assistantMessage];
    setMessages(finalMessages);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const clearInput = () => {
    setInputText('');
  };

  useEffect(() => {
    if (isNewChat) {
      setMessages([{ role: ChatRole.Assistant, prompt: IA_PROMPT_TEXT, date: new Date(), imageUrl: '' }]);
    } else {
      fetchMessages();
    }
  }, [isNewChat, fetchMessages]);

  useEffect(() => {
    if (chatId && !isNewChat) {
      setIsReadOnly(true);
    }
  }, [chatId, isNewChat]);

  const handleScroll = useCallback(({ nativeEvent }: any) => {
    const isAtBottom = nativeEvent.layoutMeasurement.height + nativeEvent.contentOffset.y >= nativeEvent.contentSize.height - 20;
    setShowScrollToBottom(!isAtBottom);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
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
          renderItem={({ item }) => <MessageBubble message={item} />}
        />

        {showScrollToBottom && (
          <TouchableOpacity style={styles.scrollToBottomButton} onPress={scrollToBottom}>
            <Icon name="chevron-down" size={28} color={COLORS.white} />
          </TouchableOpacity>
        )}

        {loading && <ActivityIndicator size="large" color={COLORS.primary} style={styles.loadingIndicator} />}

        {!isReadOnly && (
          <ChatInputBox
            inputText={inputText}
            setInputText={setInputText}
            onSend={handleSendMessage}
            loading={loading}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

        )}

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatroomScreen;
