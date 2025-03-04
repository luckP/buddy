import Geolocation from "@react-native-community/geolocation";
import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import { useFocusEffect } from "@react-navigation/native"; // ✅ Ensure map resets on focus
import LostAndFoundReport from "../../../../models/LostAndFoundReport";
import { getReports } from "../../services/lostAndFoundService";
import SelectReportModal from "../../components/SelectReportModal/SelectReportModal";
import TargetMarker from "../../components/TargetMarker/TargetMarker";
import styles from "./LostFoundMainScreen.style";

const EPSILON = 0.002; // ✅ Increase threshold to reduce unnecessary API calls

const LostFoundMainScreen = ({ navigation }: { navigation: any }) => {
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [targetLocation, setTargetLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [reports, setReports] = useState<LostAndFoundReport[]>([]);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [mapReady, setMapReady] = useState(false);

  const mapRef = useRef<MapView | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastRetrievedLocation = useRef({ latitude: 0, longitude: 0 });

  /**
   * Fetch user location and center the map when screen is focused
   */
  const getUserLocation = async () => {
    
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setTargetLocation({ latitude, longitude });

        console.log('DEBUG getUserLocation', new Date(), mapRef);
        if (mapRef.current && mapReady) {
          // mapRef.current.animateToRegion({
          //   latitude,
          //   longitude,
          //   latitudeDelta: 0.05,
          //   longitudeDelta: 0.05,
          // });
        }
        else{
          // setTimeout(() => getUserLocation(), 1000)
        }

        retrieveReports(latitude, longitude);
      },
      (error) => {
        console.error("Error getting user location:", error);
        Alert.alert("Location Error", "Could not retrieve your location.");
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  /**
   * Fetch reports from backend based on location
   */
  const retrieveReports = useCallback(async (latitude: number, longitude: number) => {
    try {
      const fetchedReports = await getReports(latitude, longitude);

      setReports(fetchedReports);
      lastRetrievedLocation.current = { latitude, longitude };
    } catch (error) {
      console.error("Error fetching reports:", error);
      Alert.alert("Error", "Could not fetch lost and found reports.");
    }
  }, []);

  /**
   * Handle when the map stops moving
   */
  const handleRegionChangeComplete = useCallback((region: Region) => {
    console.log('DEBUG handleRegionChangeComplete', new Date());
    const distanceMoved = Math.sqrt(
      Math.pow(region.latitude - lastRetrievedLocation.current.latitude, 2) +
      Math.pow(region.longitude - lastRetrievedLocation.current.longitude, 2)
    );

    setTargetLocation({ latitude: region.latitude, longitude: region.longitude });

    if (distanceMoved > EPSILON) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        retrieveReports(region.latitude, region.longitude);
      }, 500); // 0.5-second debounce
    }
  }, [retrieveReports]);

  /**
   * Run when screen loads and when screen is focused
   */
  useFocusEffect(
    useCallback(() => {
      getUserLocation();
    }, [])
  );

  /**
   * Open report details when a marker is clicked
   */
  const handleMarkerPress = (report: LostAndFoundReport) => {
    setSelectedReport(report);
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      {<MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude || 41.15567604262148, 
          longitude: userLocation.longitude || -8.634555737712859,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
        onMapReady={() => {
          setMapReady(true);
          
        }}
        showsUserLocation={true}
      >
        {/* Lost and Found Reports Markers */}
        {userLocation.latitude!=0 && reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.location.coordinates[1], // GeoJSON [longitude, latitude]
              longitude: report.location.coordinates[0],
            }}
            onPress={() => handleMarkerPress(report)}
          >
            {/* Custom Marker View */}
            <View style={styles.customMarker}>
              {report.images?.length > 0 ? (
                <>
                <Text>{report.images[0]}</Text>
                <Image source={{ uri: report.images[0] }} style={styles.markerImage} />
                </>
              ) : (
                <View style={styles.noImageMarker}>
                  <Text style={styles.markerText}>{report.status.toUpperCase()}</Text>
                </View>
              )}
            </View>
          </Marker>
        ))}
      </MapView>}

      {/* Target Marker */}
      <TargetMarker />

      {/* Report Details Modal */}
      {selectedReport && (
        <SelectReportModal
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
        />
      )}

      {/* Add Report Buttons */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate("CreatePost", { isLost: true })}
        >
          <Text style={styles.floatingButtonText}>Report Lost</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => navigation.navigate("CreatePost", { isLost: false })}
        >
          <Text style={styles.floatingButtonText}>Report Found</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LostFoundMainScreen;
