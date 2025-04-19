import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import styles from "./MessageBubble.style";
import IaChatMessage from "../../../../models/IaChatMessage";


type Props = {
    message: IaChatMessage;
};

const MessageBubble: React.FC<Props> = ({ message }) => {
    const isUser = message.role === "user";

    const formatDate = (date?: Date): string => {
        if (!date) return "";

        const now = new Date();
        const isSameDay =
            date.getFullYear() === now.getFullYear() &&
            date.getMonth() === now.getMonth() &&
            date.getDate() === now.getDate();

        console.log("isSameDay", isSameDay);

        if (isSameDay) {
            return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        }

        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    };

    const formatted = formatDate(message.date);

    return (
        <View style={[styles.bubbleContainer, isUser ? styles.alignRight : styles.alignLeft]}>
            <View style={[styles.messageBubble, isUser ? styles.userMessage : styles.assistantMessage]}>

                {message.imageUrl && (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: message.imageUrl }} style={styles.image} />
                    </View>
                )}

                <Text style={styles.messageText}>{message.prompt}</Text>
                {!!formatted && <Text style={styles.timestamp}>{formatted}</Text>}
            </View>


            <View style={styles.reactionsContainer}>
                <TouchableOpacity>
                    <Icon name="share-2" size={16} color="#888" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="trash" size={16} color="#888" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="heart" size={16} color="#888" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default MessageBubble;
