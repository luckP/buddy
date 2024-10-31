import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

const styles = StyleSheet.create({
    filterButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
      },

    filterButtonDisabled: {
        backgroundColor: COLORS.white,
        borderColor: COLORS.black,
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
      },

      filterText: {
        fontSize: 14,
        color: COLORS.black,
      },
});

export default styles;