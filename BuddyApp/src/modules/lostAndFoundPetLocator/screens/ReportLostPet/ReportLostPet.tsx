import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "./ReportLostPet.style";

const ReportLostPet = ({ navigation, route }: { navigation: any; route: any }) => {
  const { isLost } = route.params;
  const [petName, setPetName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
  });
  const [images, setImages] = useState<string[]>([]);

  const handlePickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 0, // Allows selecting multiple images
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

  const handleSubmit = () => {
    if (!petName || !description) {
      Alert.alert("Error", "Please fill out all required fields.");
      return;
    }

    const report = {
      petName,
      description,
      location,
      images,
    };

    console.log("Submitting report:", report);
    Alert.alert("Success", "Your lost pet report has been submitted.");
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      { isLost && <Text style={styles.title}>Report Lost Pet</Text> }
      {!isLost && <Text style={styles.title}>Report Found Pet</Text> }

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
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={location}
          draggable // Enables dragging the marker
          onDragEnd={(e) =>
            setLocation({
              latitude: e.nativeEvent.coordinate.latitude,
              longitude: e.nativeEvent.coordinate.longitude,
            })
          }
        />
      </MapView>

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

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Report</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportLostPet;
