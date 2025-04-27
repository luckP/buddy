import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
  bannerContainer: {
    overflow: 'hidden',
    borderRadius: 20,
    margin: 20,
  },
  banner: {
    width: '100%',
    height: 180,
  },

  quickActionBlue: {
    backgroundColor: COLORS.blue,
  },
  quickActionGreen: {
    backgroundColor: COLORS.green,
  },
  quickActionPink: {
    backgroundColor: COLORS.pink,
  },
  quickActionPurple: {
    backgroundColor: COLORS.purple,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.padding,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  moreButton: {
    fontSize: SIZES.fontSmall,
    color: COLORS.gray,
  },
  recommendationsList: {
    paddingHorizontal: SIZES.padding * 2,
    marginVertical: 20,
  },
  recommendationCard: {
    width: '50%',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginRight: 15,
    shadowColor: COLORS.black,
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: '100%',
    height: 120,
  },
  recommendationTextContainer: {
    padding: 8,
  },
  recommendationTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: COLORS.primary,
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
  },
  quickActionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginBottom: 25,
  },

  quickAction: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden', // Important for the rounded gradient
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  quickActionText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.white,
    fontWeight: '600',
  },

  quickActionInner: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  

});

export default styles;
