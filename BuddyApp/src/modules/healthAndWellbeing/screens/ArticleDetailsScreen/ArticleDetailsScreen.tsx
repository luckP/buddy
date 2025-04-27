import React from 'react';
import { View, Text } from 'react-native';
import styles from './ArticleDetailsScreen.style';

const ArticleDetailsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Article Details</Text>
    </View>
  );
};

export default ArticleDetailsScreen;
