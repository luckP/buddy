import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    customMarker: {
      alignItems: "center",
    },
    markerImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      borderWidth: 2,
      borderColor: "white",
    },
    markerText: {
      backgroundColor: "rgba(0,0,0,0.6)",
      color: "white",
      paddingHorizontal: 5,
      borderRadius: 5,
      marginTop: 5,
      fontSize: 10,
      textAlign: "center",
    },
    floatingButtons: {
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    floatingButton: {
      backgroundColor: COLORS.primary,
      padding: 10,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 5,
      alignItems: "center",
    },
    floatingButtonText: {
      color: "white",
      fontWeight: "bold",
    },
  });

  export default styles;