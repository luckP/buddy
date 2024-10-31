import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import styles from './HomeScreen.style';
import Card from './components/Card/Card';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.jpeg')} style={styles.logo} />
      </View>

      <View style={styles.cardContainer}>
        <Card 
          title="Rede Social BUDDIES"
          description="Connect with other pet owners and share moments."
          image={require('../../assets/logo.jpeg')}
          icon="paw"
        />
        <Card 
          title="Lost & Found Pet Locator"
          description="Connect with other pet owners and share moments."
          image={require('../../assets/logo.jpeg')}
          icon="search"
        />
        {/* Add more cards as needed */}
      </View>

      <Text style={styles.footerText}>ANUNCIOS</Text>
    </ScrollView>
  );
};

export default HomeScreen;
