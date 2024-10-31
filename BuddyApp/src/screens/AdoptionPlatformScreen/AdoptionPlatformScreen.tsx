import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdoptionPlatformScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Adoption Platform</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AdoptionPlatformScreen;