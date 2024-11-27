import React from 'react';
import { View, ScrollView, Text, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './HomeScreen.style';
import Card from './components/Card/Card';
import { RootStackParamList } from '../../navigation/NavigationTypes';

const HomeScreen: React.FC = () => {

  const navigationSocialMedia = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressCardSocialMedia = () => {
    navigationSocialMedia.navigate('SocialMedia');
  }

  const onPressCardVirtualConsultation = () => {

  }

  const onPressCardLostFound = () => {

  }

  const onPressCardAdoption = () => {

  }
  
  const onPressCardPetFriendly = () => {

  }

  const onPressCardMarketplace = () => {

  }

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
          onPress={onPressCardSocialMedia}
        />
        <Card 
          title="Consulta Virtual Personalizado"
          description="Conselhos e dicas imediatas e para perguntas gerais sobre cuidados de saúde."
          image={require('../../assets/images/home-card-images/card2.png')}
          icon="paw"
          onPress={onPressCardVirtualConsultation}
        />
        <Card 
          title="Lost & Found Pet Locator"
          description="Reporte animais perdidos ou encontre animais perdidos próximos a si."
          image={require('../../assets/images/home-card-images/card3.png')}
          icon="paw"
          onPress={onPressCardLostFound}
        />
        <Card 
          title="Plataforma de Adoção"
          description="Encontre animais para adoção de particulares ou em organizações próximas a si."
          image={require('../../assets/images/home-card-images/card4.png')}
          icon="paw"
          onPress={onPressCardAdoption}
        />
        <Card 
          title="Locais Pet Friendly"
          description="Descubra locais que aceitam animais, com avaliações e direções."
          image={require('../../assets/images/home-card-images/card5.png')}
          icon="paw"
          onPress={onPressCardPetFriendly}
        />
        <Card 
          title="Marketplace e Serviços"
          description="Encontre todo tipo de produtos e serviços com avaliações e recomendações."
          image={require('../../assets/images/home-card-images/card6.png')}
          icon="paw"
          onPress={onPressCardMarketplace}
        />
        {/* Add more cards as needed */}
      </View>

      <Text style={styles.footerText}>ANUNCIOS</Text>
    </ScrollView>
  );
};

export default HomeScreen;
