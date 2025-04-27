import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
    textAlign: 'center',
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskIcon: {
    marginRight: 15,
  },
  taskText: {
    fontSize: SIZES.fontMedium,
    color: COLORS.black,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.gray,
  },
});

export default styles;
