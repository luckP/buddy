import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  carouselWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  carouselContainer: {
    alignItems: 'center',
  },
  recommendationCard: {
    width: screenWidth - 40, // Full width minus the padding (20 left + 20 right)
    backgroundColor: COLORS.white,
    borderRadius: 20,
    shadowColor: COLORS.black,
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    // overflow: 'hidden',
    marginHorizontal: 10,
  },
  recommendationImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  recommendationTextContainer: {
    padding: 10,
  },
  recommendationTitle: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: SIZES.fontSmall,
    color: COLORS.gray,
  },
});

export default styles;
