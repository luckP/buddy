import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  tab: {
    alignItems: 'center',
    flexDirection: 'column',
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary, // Highlighted color for selected tab
  },
  tabText: {
    fontSize: 12,
    color: COLORS.inactive, // Default color for inactive tabs
    marginTop: 5,
  },
  activeText: {
    color: COLORS.primary, // Color for active tab text
  },
});

export default styles;
