import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { COLORS } from "../../../../constants/theme";

const VoiceButton = ({ disabled }: { disabled?: boolean }) => {
  return (
    <TouchableOpacity
      onPress={() => console.log("Voice input")}
      style={styles.button}
      disabled={disabled}
    >
      <Icon name="mic" size={20} color={COLORS.primary} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginRight: 6,
  },
});

export default VoiceButton;
