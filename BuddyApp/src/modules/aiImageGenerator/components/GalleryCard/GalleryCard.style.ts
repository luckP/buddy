import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 10,
    backgroundColor: COLORS.secondary,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: COLORS.gray,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  likes: {
    fontSize: 12,
    color: COLORS.gray,
  },
});

export default styles;
