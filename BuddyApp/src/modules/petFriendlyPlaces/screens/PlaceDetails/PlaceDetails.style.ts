import { StyleSheet, Dimensions } from "react-native";
import { COLORS, SIZES } from "../../../../constants/theme";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flexGrow: 1, // Allows full scrolling
    backgroundColor: COLORS.white, // Light gray background
    paddingBottom: SIZES.margin * 2, // Extra space for scrolling
  },
  imageContainer: {
    width: "100%",
    height: 250,
    borderRadius: 15, // Rounding the images properly
    overflow: "hidden", // Prevents image corners from extending
    alignSelf: "center",
  },
  swiper: {
    height: "100%",
  },
  carouselImage: {
    width: width - 40, // Making sure it fits within the screen
    height: 250,
    borderRadius: 15,
    alignSelf: "center",
  },
  noImages: {
    fontSize: SIZES.fontMedium,
    color: COLORS.inactive,
    textAlign: "center",
    marginBottom: SIZES.margin,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    color: COLORS.black,
    paddingVertical: SIZES.margin,
  },
  description: {
    fontSize: SIZES.fontMedium,
    color: COLORS.gray,
    textAlign: "center",
    marginVertical: SIZES.margin * 2,
    paddingHorizontal: 20,
  },
  info: {
    fontSize: SIZES.fontMedium,
    color: COLORS.black,
    textAlign: "center",
    paddingHorizontal: SIZES.margin,
    
  },
  link: {
    fontSize: SIZES.fontMedium,
    color: COLORS.primary,
    textDecorationLine: "underline",
    textAlign: "center",
    marginVertical: SIZES.margin / 2,
  },
  status: {
    fontSize: SIZES.fontMedium,
    fontWeight: "bold",
    right: 20,
    top: 25,
    // margin: SIZES.margin,
    position: "absolute",
  },
  sectionTitle: {
    fontSize: SIZES.fontLarge,
    fontWeight: "bold",
    marginVertical: SIZES.margin,
    textAlign: "left",
    color: COLORS.primary,
    paddingLeft: 20,
  },
  mapContainer: {
    height: 200,
    borderRadius: 15,
    overflow: "hidden",
    marginVertical: SIZES.margin,
    alignSelf: "center",
    width: width - 40,
  },
  map: {
    height: "100%",
    width: "100%",
  },
  reviewContainer: {
    marginTop: SIZES.margin * 2,
    padding: SIZES.padding,
    backgroundColor: COLORS.secondary, // Light gray section
    borderRadius: 15,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginHorizontal: 20,
  },
  commentInput: {
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.margin,
    backgroundColor: COLORS.white,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    marginTop: SIZES.margin,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
  },
  reviewItem: {
    padding: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  reviewUser: {
    fontWeight: "bold",
    color: COLORS.black,
  },
  reviewText: {
    fontSize: SIZES.fontSmall,
    color: COLORS.black,
  },
  noReviews: {
    fontSize: SIZES.fontSmall,
    color: COLORS.inactive,
    textAlign: "center",
  },
});
