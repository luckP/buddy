import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import styles from './ChatScreen.style';

interface Message{
  id: string;
  text: string;
  sender: string;
}

const initialMessages: Message[] = [
  { id: '1', text: 'Hey, how is your pet feeling today?', sender: 'me' },
  { id: '2', text: 'Fluffy is good, thanks! Any tip for fast recovery?', sender: 'other' },
  // Add more messages here...
];

const ChatScreen: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: String(messages.length + 1), text: message, sender: 'me' }]);
      setMessage('');
    }
  };

  const renderMessage = ({ item }: {item: Message}) => (
    <View style={item.sender === 'me' ? styles.myMessage : styles.otherMessage}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        style={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
