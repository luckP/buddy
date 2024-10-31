import { StyleSheet } from 'react-native';

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
    borderBottomColor: '#FFD700', // Highlighted color for selected tab
  },
  tabText: {
    fontSize: 12,
    color: '#666', // Default color for inactive tabs
    marginTop: 5,
  },
  activeText: {
    color: '#FFD700', // Color for active tab text
  },
});

export default styles;
