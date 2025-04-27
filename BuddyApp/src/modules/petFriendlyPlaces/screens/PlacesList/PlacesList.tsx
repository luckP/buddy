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
import { getUserLocation, Location } from '../../../../utils/locationUtils';


const PlacesList = ({ navigation }: any) => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMap, setShowMap] = useState(true); // Toggle between map and list
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const [locationLoaded, setLocationLoaded] = useState(false);

  /**
   * Loads the user's location and nearby pet-friendly places when the component mounts.
   * This effect runs only once when the component is mounted.
   *
   * @returns {void}
   */
  useEffect(() => {
    loadLocationAndPlaces();
  }, []);

  /**
   * Loads the user's current location and nearby pet-friendly places.
   * First retrieves the user's geolocation coordinates using getUserLocation(),
   * then updates the currentLocation state and locationLoaded flag.
   * Finally fetches nearby places based on the user's coordinates and
   * updates both the places and filteredPlaces states.
   *
   * @throws {Error} If there's an error getting location or fetching places
   * @returns {Promise<void>}
   */
  const loadLocationAndPlaces = async () => {
    try {
      const location = await getUserLocation();
      setCurrentLocation(location);
      setLocationLoaded(true);

      console.log('User location:', location.latitude, location.longitude);

      const data = await fetchPlaces(location.latitude, location.longitude);

      console.log('Nearby places:', data);
      setPlaces(data);
      setFilteredPlaces(data);
    } catch (error) {
      console.error('Error loading location or places:', error);
      setLocationLoaded(true);
    }
  };

  /**
   * Handles the search functionality by filtering the places based on the search term.
   * If the search term is empty, it shows all places.
   * Otherwise, it filters the places to only include those whose names contain the search term.
   * 
   * @param {string} text - The search term to filter the places by
   **/
  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === '') {
      setFilteredPlaces(places);
    } else {
      const filtered = places.filter((place: any) =>
        place.name.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredPlaces(filtered);
    }
  };


  /**
   * Renders a list item for a place.
   * 
   * @param {Object} item - The place object to render
   * @returns {React.ReactNode} The rendered list item
   */
  const renderListItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => navigation.navigate('PlaceDetails', {place: item})}>
      <Image source={{uri: item.images[0]}} style={styles.listItemImage} />
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
          onPress={() => setShowMap(true)}>
          <Text style={styles.toggleButtonText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !showMap && styles.activeButton]}
          onPress={() => setShowMap(false)}>
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
            showsUserLocation={true}>
            {filteredPlaces.map((place: any) => (
              <Marker
                key={place._id}
                coordinate={{
                  latitude: place.location.coordinates[1], // GeoJSON stores [lng, lat]
                  longitude: place.location.coordinates[0],
                }}
                onPress={() => navigation.navigate('PlaceDetails', {place})}>
                <View style={styles.markerWrapper}>
                  <View style={styles.markerImageContainer}>
                    <Image
                      source={{uri: place.images[0]}}
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
            keyExtractor={(item: any) => item._id}
            renderItem={renderListItem}
            style={styles.list}
          />
        )
      ) : (
        <Text style={styles.loadingText}>Loading map...</Text>
      )}

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CreatePlace')}>
        <Text style={styles.floatingButtonText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlacesList;
