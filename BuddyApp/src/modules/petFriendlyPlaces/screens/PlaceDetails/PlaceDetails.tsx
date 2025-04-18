import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Swiper from "react-native-swiper";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { AirbnbRating } from "react-native-ratings";
import styles from "./PlaceDetails.style";
import { addReview } from "../../services/placesService";
import { COLORS } from "../../../../constants/theme";


const PlaceDetails = ({ route }: { route: any }) => {
  const { place } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState(place.user_ratings || []);

  const handleAddReview = async () => {
    if (!rating || !comment.trim()) return;

    const newReview = {
      rating,
      comment,
      user_id: "test_user",
      timestamp: new Date(),
    };

    try {
      await addReview(place._id, newReview);
      setReviews([...reviews, newReview]);
      setRating(0);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image Carousel */}
      <Text
        style={[
          styles.status,
          { color: place.is_active ? COLORS.success : COLORS.danger },
        ]}
      >
        {place.is_active ? "🟢" : "🔴"}
      </Text>

      <Text style={styles.title}>{place.name}</Text>


      <View style={styles.imageContainer}>
        {place.images && place.images.length > 0 ? (
          <Swiper style={styles.swiper} showsPagination loop>
            {place.images.map((image: string, index: number) => (
              <Image key={index} source={{ uri: image }} style={styles.carouselImage} resizeMode="cover" />
            ))}
          </Swiper>
        ) : (
          <Text style={styles.noImages}>No images available</Text>
        )}
      </View>

      {/* Place Information */}
      
      <Text style={styles.description}>{place.description}</Text>
      <Text style={styles.info}>📍 {place.address}</Text>
      {place.phone && <Text style={styles.info}>📞 {place.phone}</Text>}
      {place.website && (
        <Text style={styles.link} onPress={() => console.log("Open URL")}>
          🌐 {place.website}
        </Text>
      )}
      <Text style={styles.info}>Category: {place.category}</Text>
    

      {/* Map View */}
      <Text style={styles.sectionTitle}>Location</Text>
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: place.location.coordinates[1],
            longitude: place.location.coordinates[0],
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: place.location.coordinates[1],
              longitude: place.location.coordinates[0],
            }}
            title={place.name}
          />
        </MapView>
      </View>

      {/* Reviews Section */}
      <Text style={styles.sectionTitle}>Reviews</Text>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.reviewItem}>
              <Text style={styles.reviewUser}>User {item.user_id}</Text>
              <Text style={styles.reviewText}>
                ⭐ {item.rating} - {item.comment}
              </Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noReviews}>No reviews yet.</Text>
      )}

      {/* Add Review Section */}
      <View style={styles.reviewContainer}>
        <Text style={styles.sectionTitle}>Rate this place</Text>
        <AirbnbRating count={5} defaultRating={rating} size={20} onFinishRating={setRating} />
        <TextInput style={styles.commentInput} placeholder="Write a comment..." value={comment} onChangeText={setComment} />
        <TouchableOpacity style={styles.submitButton} onPress={handleAddReview}>
          <Text style={styles.submitButtonText}>Submit Review</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;
