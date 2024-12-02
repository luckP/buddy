import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    Alert,
    Platform,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const LostFoundMainScreen = ({ navigation }: { navigation: any }) => {
    const [userLocation, setUserLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [reports, setReports] = useState([
        {
            id: '1',
            type: 'lost',
            title: 'Lost Dog',
            description: 'Golden Retriever, last seen near Central Park.',
            location: { latitude: 40.785091, longitude: -73.968285 },
            image: 'https://placekitten.com/300/200',
            contact: 'john@example.com',
        },
        {
            id: '2',
            type: 'found',
            title: 'Found Cat',
            description: 'Tabby cat found near 5th Avenue.',
            location: { latitude: 40.780091, longitude: -73.969285 },
            image: 'https://placekitten.com/300/201',
            contact: 'jane@example.com',
        },
    ]);
    const [selectedReport, setSelectedReport] = useState<any>(null);
    

    // Get user's current location
    const getUserLocation = async () => {
        const permission =
            Platform.OS === 'ios'
                ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    
        // geolocation.requestAuthorization()

        const permissionStatus = await check(permission);
    
        if (permissionStatus === RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    Alert.alert('Error', 'Unable to fetch location: ' + error.message);
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        } else if (permissionStatus === RESULTS.DENIED) {
            const requestStatus = await request(permission);
            if (requestStatus === RESULTS.GRANTED) {
                getUserLocation(); // Retry fetching location if granted
            } else {
                Alert.alert('Permission Denied', 'Location permission is required to show your location.');
            }
        } else {
            Alert.alert('Error', 'Location permission is not available.');
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
                region={{
                    latitude: userLocation.latitude || 40.785091,
                    longitude: userLocation.longitude || -73.968285,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
                showsUserLocation={true}
            >
                {reports.map((report) => (
                    <Marker
                        key={report.id}
                        coordinate={report.location}
                        title={report.title}
                        description={report.description}
                        pinColor={report.type === 'lost' ? 'red' : 'green'} // Different colors for lost and found
                        onPress={() => handleMarkerPress(report)}
                    />
                ))}
            </MapView>

            {/* Report Details Modal */}
            {selectedReport && (
                <Modal
                    visible={!!selectedReport}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setSelectedReport(null)}
                >
                    <View style={styles.modalContainer}>
                        <Image
                            source={{ uri: selectedReport.image }}
                            style={styles.reportImage}
                        />
                        <Text style={styles.reportTitle}>
                            {selectedReport.title}
                        </Text>
                        <Text style={styles.reportDescription}>
                            {selectedReport.description}
                        </Text>
                        <Text style={styles.reportContact}>
                            Contact: {selectedReport.contact}
                        </Text>
                        <TouchableOpacity
                            style={styles.alertButton}
                            onPress={() =>
                                console.log('Report flagged for review.')
                            }
                        >
                            <Text style={styles.alertButtonText}>
                                Report Post
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setSelectedReport(null)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            )}

            {/* Add Report Buttons */}
            <View style={styles.floatingButtons}>
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => navigation.navigate('ReportLostPet')}
                >
                    <Text style={styles.floatingButtonText}>Report Lost</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.floatingButton}
                    onPress={() => navigation.navigate('ReportFoundPet')}
                >
                    <Text style={styles.floatingButtonText}>Report Found</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    reportImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    reportTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    reportDescription: {
        fontSize: 16,
        marginVertical: 10,
    },
    reportContact: {
        fontSize: 16,
        color: 'gray',
    },
    alertButton: {
        backgroundColor: '#FF6347',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    alertButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 20,
    },
    closeButtonText: {
        color: 'blue',
        fontSize: 16,
    },
    floatingButtons: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    floatingButton: {
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    floatingButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default LostFoundMainScreen;
