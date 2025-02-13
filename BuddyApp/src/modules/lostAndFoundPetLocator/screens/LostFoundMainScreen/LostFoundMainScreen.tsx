import Geolocation from "@react-native-community/geolocation";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import LostAndFoundReport from "../../../../models/LostAndFoundReport";
import { getReports } from "../../services/lostAndFoundService";
import SelectReportModal from "../../components/SelectReportModal/SelectReportModal";
import TargetMarker from "../../components/TargetMarker/TargetMarker";
import styles from "./LostFoundMainScreen.style";

const EPSILON = 0.0005; // Define the threshold for movement

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

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const lastRetrievedLocation = useRef({
    latitude: 0,
    longitude: 0,
  });

  const getUserLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setTargetLocation({ latitude, longitude });
        retrieveReports(latitude, longitude);
      },
      (error) => {
        console.error("Error getting user location:", error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const retrieveReports = async (latitude: number, longitude: number) => {
    try {
      const reports = await getReports(latitude, longitude);
      setReports(reports);
      lastRetrievedLocation.current = { latitude, longitude }; // Update the last retrieved location
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegionChangeComplete = (region: Region) => {
    const distanceMoved = Math.sqrt(
      Math.pow(region.latitude - lastRetrievedLocation.current.latitude, 2) +
      Math.pow(region.longitude - lastRetrievedLocation.current.longitude, 2)
    );

    setTargetLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });

    // Check if the movement exceeds the epsilon value
    if (distanceMoved > EPSILON) {
      // Clear the previous timeout to debounce
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      // Set a new timeout
      debounceTimeout.current = setTimeout(() => {
        retrieveReports(region.latitude, region.longitude);
      }, 500); // 0.5-second debounce
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleMarkerPress = (report: any) => {
    setSelectedReport(report);
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude || 40.785091,
          longitude: userLocation.longitude || -73.968285,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation={true}
      >
        {/* Lost and Found Reports Markers */}
        {reports.map((report) => (
          <Marker
            key={report.id}
            coordinate={{
              latitude: report.latitude,
              longitude: report.longitude,
            }}
            onPress={() => handleMarkerPress(report)}
          >
            {/* Custom Marker View */}
            <View style={styles.customMarker}>
              <Image
                source={{ uri: report.images[0] }}
                style={styles.markerImage}
              />
              <Text style={styles.markerText}>
                {report.type === "lost" ? "Lost" : "Found"}
              </Text>
            </View>
          </Marker>
        ))}
      </MapView>

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
