import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: COLORS.black,
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
    color: COLORS.black,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
    color: COLORS.black,
  },
  category: {
    fontSize: 14,
    color: COLORS.black,
    marginBottom: 10,
  },
  likeButton: {
    padding: 5,
  },
  imageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  mainImage: {
    width: 225,
    height: 180,
    borderRadius: 3,
    marginRight: 10,
  },
  thumbnailList: {
    justifyContent: 'center',
  },
  thumbnailImage: {
    width: 105,
    height: 84,
    borderRadius: 3,
    marginBottom: 10,
  },
  times: {
    flexDirection: 'row',
    marginTop: 10,
  },
  timeButton: {
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  timeText: {
    fontSize: 12,
    color: COLORS.white,
  },
});

export default styles;
