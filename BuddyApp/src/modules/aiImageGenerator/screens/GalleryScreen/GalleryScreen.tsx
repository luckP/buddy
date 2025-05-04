import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AiImage } from '../../../../models/AiImage';
import GalleryCard from '../../components/GalleryCard/GalleryCard';
import styles from './GalleryScreen.style';
import { fetchAiImages } from '../../services/aiImageService';

const GalleryScreen = ({ navigation }: { navigation: any }) => {
  const [images, setImages] = useState<AiImage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const result = await fetchAiImages();
        setImages(result);
      } catch (error) {
        console.error("Failed to load images", error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#888" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={images}
          keyExtractor={(item) => item._id || item.id} // support both keys
          numColumns={2}
          renderItem={({ item }) => <GalleryCard image={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}

      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fabButton} onPress={() => navigation.navigate('CreateImage')}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GalleryScreen;
