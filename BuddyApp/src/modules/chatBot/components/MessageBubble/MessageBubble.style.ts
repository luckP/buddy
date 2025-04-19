import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";

const styles = StyleSheet.create({
  bubbleContainer: {
    marginBottom: 10,
    paddingHorizontal: 12,
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  alignLeft: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: COLORS.success,
  },
  assistantMessage: {
    backgroundColor: COLORS.secondary,
  },
  messageText: {
    fontSize: 16,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
  reactionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
    paddingHorizontal: 4,
  },

  imageContainer: {
    marginTop: 8,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
});

export default styles;
