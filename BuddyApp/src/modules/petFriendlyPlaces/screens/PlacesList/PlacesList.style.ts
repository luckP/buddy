import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  topMenu: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  toggleButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
  },
  activeButton: {
    backgroundColor: COLORS.primary, // iOS blue style
  },
  toggleButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  list: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listItemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  listItemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  listItemDescription: {
    fontSize: 14,
    color: '#666',
  },

  markerWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
  },
  markerImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 8, // Slight rounding for square markers
    borderWidth: 3, // Makes it pop
    borderColor: COLORS.primary, // Primary theme color for border
    backgroundColor: COLORS.white,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  markerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8, // Ensures image is also rounded properly
  },
  markerLabelContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    position: "absolute",
    bottom: 0, // Moves it down a bit for better alignment
    maxWidth: 80,
  },
  markerLabelText: {
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.white,
    textAlign: "center",
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
  },

  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#f5a623', // orange button
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  

});
