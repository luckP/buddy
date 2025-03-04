import { StyleSheet } from "react-native";

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

  export default styles;