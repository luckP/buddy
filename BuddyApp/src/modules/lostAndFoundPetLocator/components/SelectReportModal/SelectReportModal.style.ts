import { StyleSheet, Dimensions, Platform, StatusBar } from "react-native";
import { COLORS } from "../../../../constants/theme";

const { width } = Dimensions.get("window");
const statusBarHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight || 0;

export default StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: statusBarHeight + 30,
        paddingHorizontal: 20,
        alignItems: "center",
    },
    carouselContainer: {
        height: 200,
        width: width - 40,
        marginBottom: 10,
    },
    swiper: {},
    carouselImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    dotStyle: {
        backgroundColor: "#ccc",
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
    },
    activeDotStyle: {
        backgroundColor: "#000",
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 3,
    },
    reportTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    detailsContainer: {
        marginVertical: 10,
        width: "100%",
    },
    reportDescription: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: "center",
    },
    reportContact: {
        fontSize: 16,
        color: "gray",
        textAlign: "center",
    },
    commentsContainer: {
        marginTop: 20,
        width: "100%",
        flex: 3,
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
    commentText: {
        fontSize: 14,
        marginBottom: 5,
    },
    commentActions: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    likeButton: {
        padding: 5,
    },
    reportButton: {
        padding: 5,
    },
    addCommentContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
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
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
    },
    addCommentButtonText: {
        color: "white",
    },

    actionButtonsContainer: {
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-around",
        marginTop: 20,
        width: "100%",
        marginBottom: 20,
    },
    alertButton: {
        backgroundColor: "transparent",
        borderColor: "#FF6347",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    alertButtonText: {
        color: "#FF6347",
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: "transparent",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
    },
    closeButtonText: {
        color: "black",
        fontWeight: "bold",
    },

    confirmationModalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
      },
      confirmationBox: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
      },
      confirmationText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
      },
      confirmationActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
      },
      confirmButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginRight: 10,
        alignItems: "center",
      },
      confirmButtonText: {
        color: "white",
        fontWeight: "bold",
      },
      cancelButton: {
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginLeft: 10,
        alignItems: "center",
      },
      cancelButtonText: {
        color: "white",
        fontWeight: "bold",
      },
      
});
