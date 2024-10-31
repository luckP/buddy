import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end', // Align text at the bottom
    borderRadius: 10,
    overflow: 'hidden',
  },
  textContainer: {
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for text readability
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: COLORS.white,
  },
  icon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    color: COLORS.primary,
  },
});

export default styles;
