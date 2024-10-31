import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import styles from './HomeScreen.style';
import Card from './components/Card/Card';

const HomeScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/logoBuddy.png')} style={styles.logo} />
      </View>

      <View style={styles.cardContainer}>
        <Card 
          title="Rede Social BUDDIES"
          description="Connect with other pet owners and share moments."
          image={require('../../assets/images/home-card-images/card1.png')}
          icon="paw"
        />
        <Card 
          title="Rede Social BUDDIES"
          description="Connect with other pet owners and share moments."
          image={require('../../assets/images/home-card-images/card2.png')}
          icon="paw"
        />
        <Card 
          title="Rede Social BUDDIES"
          description="Connect with other pet owners and share moments."
          image={require('../../assets/images/home-card-images/card3.png')}
          icon="paw"
        />
        <Card 
          title="Rede Social BUDDIES"
          description="Connect with other pet owners and share moments."
          image={require('../../assets/images/home-card-images/card4.png')}
          icon="paw"
        />
        <Card 
          title="Rede Social BUDDIES"
          description="Connect with other pet owners and share moments."
          image={require('../../assets/images/home-card-images/card5.png')}
          icon="paw"
        />
        <Card 
          title="Rede Social BUDDIES"
          description="Connect with other pet owners and share moments."
          image={require('../../assets/images/home-card-images/card6.png')}
          icon="paw"
        />
        {/* Add more cards as needed */}
      </View>

      <Text style={styles.footerText}>ANUNCIOS</Text>
    </ScrollView>
  );
};

export default HomeScreen;
