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

  const onPressCardChatBot = () => {
    navigationSocialMedia.navigate('ChatBot');
  }

  const onPressCardLostFound = () => {
    navigationSocialMedia.navigate('LostPets');
  }

  const onPressCardAdoption = () => {
    navigationSocialMedia.navigate('MarketPlace');
  }
  
  const onPressCardPetFriendly = () => {
    navigationSocialMedia.navigate('PetfriendlyPlaces');
  }

  const onPressCardMarketplace = () => {
    navigationSocialMedia.navigate('MarketPlace');
  }

  const onPressCardAiImageGenerator = () => {
    navigationSocialMedia.navigate('AiImageGenerator');
  };


  const onPressCardHealthAndWellbeing = () => {
    navigationSocialMedia.navigate('HealthAndWellbeing');
  };

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
          onPress={onPressCardChatBot}
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
        <Card 
          title="Gerador de Imagens com IA"
          description="Crie imagens únicas dos seus pets com diferentes estilos artísticos!"
          image={require('../../assets/images/home-card-images/card1.png')} // You can pick another image later
          icon="paw"
          onPress={onPressCardAiImageGenerator}
        />
        <Card 
          title="Saúde e Bem-Estar"
          description="Melhore a qualidade de vida do seu pet e a sua com dicas de saúde, bem-estar e rotinas diárias!"
          image={require('../../assets/images/home-card-images/card2.png')} // ⚡ Pick an appropriate image later!
          icon="heartbeat" // ❤️ You can change icon if you want
          onPress={onPressCardHealthAndWellbeing}
        />

        {/* Add more cards as needed */}
      </View>

      <Text style={styles.footerText}>ANUNCIOS</Text>
    </ScrollView>
  );
};

export default HomeScreen;
