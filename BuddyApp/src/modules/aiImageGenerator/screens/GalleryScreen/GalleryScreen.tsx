import React, { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AiImage } from '../../../../models/AiImage';
import GalleryCard from '../../components/GalleryCard/GalleryCard';
import styles from './GalleryScreen.style';

// Mocked list of images
const mockImages: AiImage[] = [
  {
    id: '1',
    title: 'Cute Puppy',
    description: 'A watercolor style painting of a cute puppy.',
    imageUrl: 'https://aipetphotos.com/static/media/ah5ngmcv8fdglzxansrc.6c2dff974cff673d3764.webp',
    style: 'Watercolor',
    comments: [],
    likes: 10,
    isFavorite: true,
  },
  {
    id: '2',
    title: 'Royal Cat',
    description: 'Realistic portrait of a majestic cat.',
    imageUrl: 'https://aipetphotos.com/static/media/ah5ngmcv8fdglzxansrc.6c2dff974cff673d3764.webp',
    style: 'Realistic',
    comments: [],
    likes: 25,
    isFavorite: false,
  },
  {
    id: '3',
    title: 'Space Doggo',
    description: 'Cartoon style dog in space suit.',
    imageUrl: 'https://aipetphotos.com/static/media/ah5ngmcv8fdglzxansrc.6c2dff974cff673d3764.webp',
    style: 'Cartoon',
    comments: [],
    likes: 15,
    isFavorite: true,
  },
  {
    id: '4',
    title: 'Space Doggo',
    description: 'Cartoon style dog in space suit.',
    imageUrl: 'https://aipetphotos.com/static/media/ah5ngmcv8fdglzxansrc.6c2dff974cff673d3764.webp',
    style: 'Cartoon',
    comments: [],
    likes: 15,
    isFavorite: true,
  },
  {
    id: '5',
    title: 'Space Doggo',
    description: 'Cartoon style dog in space suit.',
    imageUrl: 'https://aipetphotos.com/static/media/ah5ngmcv8fdglzxansrc.6c2dff974cff673d3764.webp',
    style: 'Cartoon',
    comments: [],
    likes: 15,
    isFavorite: true,
  },
  {
    id: '6',
    title: 'Space Doggo',
    description: 'Cartoon style dog in space suit.',
    imageUrl: 'https://aipetphotos.com/static/media/ah5ngmcv8fdglzxansrc.6c2dff974cff673d3764.webp',
    style: 'Cartoon',
    comments: [],
    likes: 15,
    isFavorite: true,
  },
  {
    id: '7',
    title: 'Space Doggo',
    description: 'Cartoon style dog in space suit.',
    imageUrl: 'https://aipetphotos.com/static/media/ah5ngmcv8fdglzxansrc.6c2dff974cff673d3764.webp',
    style: 'Cartoon',
    comments: [],
    likes: 15,
    isFavorite: true,
  },
  // {
  //   id: '8',
  //   title: 'Space Doggo',
  //   description: 'Cartoon style dog in space suit.',
  //   imageUrl: 'https://aipetphotos.com/static/media/ah5ngmcv8fdglzxansrc.6c2dff974cff673d3764.webp',
  //   style: 'Cartoon',
  //   comments: [],
  //   likes: 15,
  //   isFavorite: true,
  // },
];

const GalleryScreen = ({ navigation }: { navigation: any }) => {
  const [images] = useState<AiImage[]>(mockImages);

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => <GalleryCard image={item} />}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.fabContainer}>
        <TouchableOpacity style={styles.fabButton} onPress={() => navigation.navigate('CreateImage')}>
          <Icon name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default GalleryScreen;
