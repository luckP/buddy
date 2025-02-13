import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import styles from './PlacesList.style';
import { fetchPlaces } from '../../services/placesService';
import Geolocation from '@react-native-community/geolocation';

const PlacesList = ({ navigation }: any) => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMap, setShowMap] = useState(true); // Toggle between map and list
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [locationLoaded, setLocationLoaded] = useState(false);


  const getUserLocation = () => {
    const loadPlaces = async (location: {
      latitude: number;
      longitude: number;
    }) => {
      try {
        const data: any = await fetchPlaces(location.latitude, location.longitude);
        setPlaces(data);
        setFilteredPlaces(data); // Initialize filteredPlaces
      } catch (error) {
        console.error('Error loading places:', error);
      }
    };



    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
        setLocationLoaded(true);
        loadPlaces({
          latitude,
          longitude,
        });
      },
      (error) => {
        console.error('Error retrieving user location:', error);
        setLocationLoaded(true); // Allow rendering even if location fails
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const handleRegionChangeComplete = (region: any) => {
  };

  useEffect(() => {
    

    getUserLocation();
  }, []);

  useEffect(() => {
    // Fetch places whenever the location changes
    const loadPlacesOnRegionChange = async () => {
      try {
        const data: any = await fetchPlaces(currentLocation.latitude, currentLocation.longitude);
        setPlaces(data);
        setFilteredPlaces(data);
      } catch (error) {
        console.error('Error loading places after region change:', error);
      }
    };

    if (currentLocation.latitude !== 0 && currentLocation.longitude !== 0) {
      loadPlacesOnRegionChange();
    }
  }, [currentLocation]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === '') {
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter((place: any) =>
        place.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPlaces(filtered);
    }
  };

  const renderListItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('PlaceDetails', { place: item })}
    >
      <Image source={{ uri: item.image }} style={styles.listItemImage} />
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
        <Text style={styles.listItemDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Menu */}
      <View style={styles.topMenu}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a place..."
          value={searchTerm}
          onChangeText={handleSearch}
        />
        <TouchableOpacity
          style={[styles.toggleButton, showMap && styles.activeButton]}
          onPress={() => setShowMap(true)}
        >
          <Text style={styles.toggleButtonText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !showMap && styles.activeButton]}
          onPress={() => setShowMap(false)}
        >
          <Text style={styles.toggleButtonText}>List</Text>
        </TouchableOpacity>
      </View>
  
      {/* Map or List View */}
      {locationLoaded ? (
        showMap ? (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={currentLocation}
            onRegionChangeComplete={handleRegionChangeComplete}
            showsUserLocation={true}
          >
            {filteredPlaces.map((place: any) => (
              <Marker
                key={place.id}
                coordinate={{
                  latitude: place.latitude,
                  longitude: place.longitude,
                }}
                onPress={() =>
                  navigation.navigate('PlaceDetails', { place })
                }
              >
                <View style={styles.markerWrapper}>
                  <View style={styles.markerImageContainer}>
                    <Image
                      source={{ uri: place.image }}
                      style={styles.markerImage}
                    />
                  </View>
                  <View style={styles.markerLabelContainer}>
                    <Text style={styles.markerLabelText} numberOfLines={1}>
                      {place.name}
                    </Text>
                  </View>
                </View>
              </Marker>
            ))}
          </MapView>
        ) : (
          <FlatList
            data={filteredPlaces}
            keyExtractor={(item: any) => item.id}
            renderItem={renderListItem}
            style={styles.list}
          />
        )
      ) : (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Loading map...
        </Text>
      )}
    </View>
  );
  
};

export default PlacesList;
