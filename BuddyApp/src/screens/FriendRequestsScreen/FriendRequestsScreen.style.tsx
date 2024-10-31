import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  requestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  requestImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  requestName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  confirmButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  removeButton: {
    backgroundColor: '#DC3545',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
