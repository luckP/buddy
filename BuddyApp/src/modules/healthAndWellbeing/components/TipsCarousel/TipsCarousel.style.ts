import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

const { width: screenWidth } = Dimensions.get('window');

const CARD_WIDTH = (screenWidth - 60) / 2; 
// screenWidth - (20 left padding + 20 right padding + 20 between two cards)

const styles = StyleSheet.create({
  tipsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tipsColumn: {
    width: CARD_WIDTH,
    marginRight: 20,
  },
  tipCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
    marginBottom: 20,
  },
  tipImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  tipTextContainer: {
    padding: 8,
  },
  tipTitle: {
    fontSize: SIZES.fontMedium,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },
  tipSubtitle: {
    fontSize: SIZES.fontSmall,
    color: COLORS.gray,
  },
});

export default styles;
