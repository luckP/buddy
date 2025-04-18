import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: COLORS.white,
    },
    noChatsText: {
      textAlign: 'center',
      fontSize: 16,
      color: 'gray',
      marginTop: 20,
    },
    chatItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.gray,
    },
    chatTitle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    chatDate: {
      fontSize: 14,
      color: 'gray',
    },
    newChatButton: {
      marginTop: 20,
      backgroundColor: COLORS.primary,
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
    },
    newChatButtonText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  export default styles;