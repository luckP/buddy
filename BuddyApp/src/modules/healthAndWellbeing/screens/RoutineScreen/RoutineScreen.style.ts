import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    padding: SIZES.padding,
    paddingBottom: 120,
  },
  title: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: SIZES.fontMedium,
    fontWeight: '600',
    marginVertical: 15,
    color: COLORS.primary,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
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
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
  },
  summaryBox: {
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: SIZES.fontSmall,
    color: COLORS.gray,
  },
  summaryValue: {
    fontSize: SIZES.fontLarge,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },



  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalClose: {
    color: '#007AFF',
    fontSize: 16,
    marginTop: 10,
  },
  
  
});

export default styles;
