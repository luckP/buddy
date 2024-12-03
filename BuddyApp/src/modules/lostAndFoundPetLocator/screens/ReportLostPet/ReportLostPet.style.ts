import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";

const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      padding: 10,
      marginBottom: 15,
    },
    multilineInput: {
      height: 100,
      textAlignVertical: "top",
    },
    map: {
      height: 200,
      borderRadius: 8,
      marginBottom: 15,
    },
    imageScroll: {
      flexDirection: "row",
      marginBottom: 15,
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 8,
      marginRight: 10,
    },
    addImageButton: {
      width: 100,
      height: 100,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      backgroundColor: "#f5f5f5",
    },
    addImageButtonText: {
      color: "#666",
    },
    submitButton: {
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: "center",
    },
    submitButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
  });

  export default styles;