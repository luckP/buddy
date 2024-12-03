import React from "react";
import { View, StyleSheet } from "react-native";

const TargetMarker = () => {
  return <View style={styles.targetMarker} />;
};

const styles = StyleSheet.create({
  targetMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "blue",
    borderWidth: 3,
    borderColor: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -15, // Center horizontally
    marginTop: -15, // Center vertically
  },
});

export default TargetMarker;
