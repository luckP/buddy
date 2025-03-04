import { StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white, // Maintain a clean background color
  },
  map: {
    flex: 1,
  },

  // 🔹 Custom Marker Style
  customMarker: {
    alignItems: "center",
    justifyContent: "center",
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "white",
  },
  markerText: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 10,
    textAlign: "center",
  },

  // 🔹 Fallback marker when no image is available
  noImageMarker: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.gray, // Neutral color for missing image
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },

  // 🔹 Floating Action Buttons for Reporting Lost/Found Pets
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  floatingButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },

  // 🔹 Modal styles for report details
  reportModal: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // For Android
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  reportDescription: {
    fontSize: 14,
    color: COLORS.gray,
    textAlign: "center",
  },
});

export default styles;
