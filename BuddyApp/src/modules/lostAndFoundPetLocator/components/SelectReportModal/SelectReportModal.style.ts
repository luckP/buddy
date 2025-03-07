import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";

const { width } = Dimensions.get("window");
const statusBarHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight || 0;

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: statusBarHeight + 50,
    paddingHorizontal: 20,
    alignItems: "center",
  },

  reportTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  imageContainer: {
    width: width - 40,
    height: 250, // Fixed height for better fit
    marginBottom: 15,
  },

  swiper: {
    height: 250,
  },

  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  detailsContainer: {
    marginVertical: 0,
    width: "100%",
    maxHeight: 150,
  },

  reportDescription: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },

  commentsContainer: {
    marginTop: 0,
    width: "100%",
    flex: 1,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },

  addCommentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 50,
  },

  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },

  addCommentButton: {
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },

  addCommentButtonText: {
    color: "white",
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 12,
    borderRadius: 8,
    width: "50%",
    alignItems: "center",
  },

  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },

  closeButtonTop: {
    position: "absolute",
    top: statusBarHeight + 40,
    right: 15,
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  
  closeButtonTopText: {
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
  },
  
});
