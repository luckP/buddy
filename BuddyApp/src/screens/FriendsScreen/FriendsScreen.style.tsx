import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  messageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  messageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default styles;
