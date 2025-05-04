import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme'; // adjust if needed

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  header: {
    width,
    height: 220,
    padding: SIZES.padding,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerImage: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerSubtext: {
    color: COLORS.white,
    fontSize: 14,
    marginTop: 8,
  },
  tipList: {
    padding: SIZES.padding,
    paddingTop: 20,
  },
  tipCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  tipCategory: {
    fontSize: 12,
    color: COLORS.white,
    marginBottom: 6,
    fontWeight: '600',
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: COLORS.white,
  },
});

export default styles;
