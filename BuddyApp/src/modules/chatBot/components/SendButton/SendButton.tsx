import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../../../../constants/theme";

const SendButton = ({ onPress, disabled }: { onPress: () => void; disabled?: boolean }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, { backgroundColor: disabled ? COLORS.gray : COLORS.info }]}
      disabled={disabled}
    >
      <Icon name="send" size={18} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
  },
});

export default SendButton;
