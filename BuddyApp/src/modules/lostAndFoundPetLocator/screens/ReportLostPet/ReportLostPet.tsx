import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Geolocation from "@react-native-community/geolocation";
import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";
import { createReport } from "../../services/lostAndFoundService"; // Import API service
import styles from "./ReportLostPet.style";

const ReportLostPet = ({ navigation, route }: { navigation: any; route: any }) => {
  const { isLost } = route.params;
  const [petName, setPetName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({
    latitude: 41.15567604262148, 
    longitude: -8.634555737712859,
  });
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [userLocationLoaded, setUserLocationLoaded] = useState(false);

  /**
   * Fetch user's location and center the map on it.
   */
  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setUserLocationLoaded(true);
      },
      (error) => {
        console.error("Error getting user location:", error);
        Alert.alert("Location Error", "Could not retrieve your location.");
        setUserLocationLoaded(true); // Allow user to continue even if location fails
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  /**
   * Handles image selection from gallery
   */
  const handlePickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 5, // Allows up to 5 images
      });

      if (result.assets) {
        const newImages: string[] =
          result.assets.map((asset) => asset.uri || "") || [];
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    } catch (error) {
      console.error("Error selecting images:", error);
      Alert.alert("Error", "Unable to select images.");
    }
  };

  /**
   * Handles map movement and updates the selected location
   */
  const handleRegionChangeComplete = (region: Region) => {
    setLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  /**
   * Handles form submission and API request
   */
  const handleSubmit = async () => {
    if (!petName.trim() || !description.trim()) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    setLoading(true);

    try {
      await createReport(petName, description, images, location, isLost ? "lost" : "found");
      Alert.alert("Success", `Your ${isLost ? "lost" : "found"} pet report has been submitted.`);
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting report:", error);
      Alert.alert("Error", "Failed to submit the report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{isLost ? "Report Lost Pet" : "Report Found Pet"}</Text>

      <Text style={styles.label}>Pet Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pet's name"
        value={petName}
        onChangeText={setPetName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Provide details about the pet"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Location</Text>
      <View style={styles.mapContainer}>
        {!userLocationLoaded ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onRegionChangeComplete={handleRegionChangeComplete}
            onMapReady={() => setMapReady(true)}
          />
        )}

        {/* Fixed marker in the center of the screen */}
        <View style={styles.centerMarkerContainer}>
          <Image
            source={require("../../../../assets/images/location-pin.png")} // Use a pin icon
            style={styles.centerMarker}
          />
        </View>
      </View>

      <Text style={styles.label}>Images</Text>
      <ScrollView horizontal style={styles.imageScroll}>
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
        <TouchableOpacity
          style={styles.addImageButton}
          onPress={handlePickImage}
        >
          <Text style={styles.addImageButtonText}>+ Add Image</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitButtonText}>{loading ? "Submitting..." : "Submit Report"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportLostPet;
