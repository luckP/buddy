import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../../../../constants/theme";
import VoiceButton from "../VoiceButton/VoiceButton";
import ImageButton from "../ImageButton/ImageButton";
import SendButton from "../SendButton/SendButton";

type Props = {
    inputText: string;
    setInputText: (text: string) => void;
    onSend: () => void;
    loading: boolean;
    selectedImage: string | null;
    setSelectedImage: (uri: string | null) => void;
  };

const ChatInputBox: React.FC<Props> = ({ inputText, setInputText, onSend, loading, selectedImage, setSelectedImage }) => {
  return (
    <View style={styles.wrapper}>
        {selectedImage && (
        <View style={styles.previewContainer}>
            <TouchableOpacity onPress={() => setSelectedImage(null)}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            </TouchableOpacity>
        </View>
        )}
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Mensagem..."
        editable={!loading}
        multiline
        numberOfLines={1}
        maxLength={200}
        textAlignVertical="center"
        scrollEnabled
      />
      <View style={styles.buttonRow}>
        <VoiceButton disabled={loading} />
        <ImageButton setSelectedImage={setSelectedImage} />
        <SendButton onPress={onSend} disabled={loading || !inputText.trim()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: COLORS.gray,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#F8F8F8",
    maxHeight: 100,
  },
  buttonRow: {
    flexDirection: "row",
    marginLeft: 8,
  },

  previewContainer: {
    marginBottom: 8,
    marginRight: 8,
  },
  
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  
});

export default ChatInputBox;
