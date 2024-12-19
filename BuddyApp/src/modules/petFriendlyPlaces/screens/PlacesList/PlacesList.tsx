import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './PlacesList.style';
import { fetchPlaces } from '../../services/placesService';

const PlacesList = ({ navigation }: any) => {
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace]: any = useState(null);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const data: any = await fetchPlaces();
        setPlaces(data);
      } catch (error) {
        console.error('Error loading places:', error);
      }
    };

    loadPlaces();
  }, []);

  const handleMarkerPress = (place: any) => {
    setSelectedPlace(place);
  };

  const navigateToPlaceDetails = () => {
    if (selectedPlace) {
      navigation.navigate('PlaceDetails', { place: selectedPlace });
    }
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 40.785091,
          longitude: -73.968285,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* Custom Markers */}
        {places.map((place: any) => (
          <Marker
            key={place.id}
            coordinate={{
              latitude: place.latitude,
              longitude: place.longitude,
            }}
            onPress={() => handleMarkerPress(place)}
          >
            {/* Custom Marker */}
            <View style={styles.markerWrapper}>
              <View style={styles.markerImageContainer}>
                <Image
                  source={{ uri: place.image }}
                  style={styles.markerImage}
                />
              </View>
              <View style={styles.markerLabelContainer}>
                <Text style={styles.markerLabelText} numberOfLines={1}>
                  {place.name} adsfasdfasfasdf asdf asdf asdfasdf
                </Text>
              </View>
            </View>
          </Marker>
        ))}
      </MapView>

      {/* Place Detail View */}
      {selectedPlace && (
        <TouchableOpacity
          style={styles.detailContainer}
          onPress={navigateToPlaceDetails}
        >
          <Text style={styles.detailTitle}>{selectedPlace.name}</Text>
          <Text style={styles.detailDescription}>
            {selectedPlace.description}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlacesList;