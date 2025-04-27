import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: COLORS.secondary, // ✅
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // perfect square image
    resizeMode: 'cover', // fit without distortion
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  
  infoContainer: {
    padding: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: COLORS.primary,
  },
  description: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  likes: {
    fontSize: 12,
    color: COLORS.gray,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 10,
  },

  listContent: {
    paddingBottom: 20,
  },

  fabContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  fabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },

  
  
});

export default styles;
