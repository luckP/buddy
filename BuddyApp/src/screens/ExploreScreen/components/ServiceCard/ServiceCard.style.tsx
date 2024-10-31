import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  times: {
    flexDirection: 'row',
    marginTop: 10,
  },
  timeButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  timeText: {
    fontSize: 12,
    color: '#FFF',
  },
});

export default styles;
