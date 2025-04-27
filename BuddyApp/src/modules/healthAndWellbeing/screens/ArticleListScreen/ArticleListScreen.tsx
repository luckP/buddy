import React from 'react';
import { View, Text } from 'react-native';
import styles from './ArticleListScreen.style';

const ArticleListScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Articles & Knowledge</Text>
    </View>
  );
};

export default ArticleListScreen;
