import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },

  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    color: '#000',
  },

  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },

  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f39c12',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    justifyContent: 'center',
  },

  imagePickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },

  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 12,
  },

  locationButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },

  locationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  submitButton: {
    backgroundColor: '#27ae60',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    flex: 1,
  },
  mapContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
    marginVertical: 15,
  },

  
  pinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -24, // Half of pin width
    marginTop: -48,  // Adjust depending on pin height
    zIndex: 10,
  },
  
  pinIcon: {
    width: 48,
    height: 48,
  },
  
});
