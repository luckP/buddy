import { StyleSheet } from 'react-native';

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
    backgroundColor: '#007AFF', // iOS blue style
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
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
  },
  markerImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  markerImage: {
    width: '100%',
    height: '100%',
  },
  markerLabelContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
    position: 'absolute',
    bottom: 2,
    maxWidth: 80,
  },
  markerLabelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
