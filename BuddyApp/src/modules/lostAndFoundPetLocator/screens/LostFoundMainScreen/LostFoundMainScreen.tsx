import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Image,
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // Import PROVIDER_GOOGLE

const LostFoundMainScreen = ({ navigation }: { navigation: any }) => {
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

    const handleMarkerPress = (report: any) => {
        setSelectedReport(report);
    };

    return (
        <View style={styles.container}>
            {/* Map View with Google Maps Provider */}
            <MapView
                provider={PROVIDER_GOOGLE} // Use Google Maps provider
                style={styles.map}
                initialRegion={{
                    latitude: 40.785091,
                    longitude: -73.968285,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {reports.map((report) => (
                    <Marker
                        key={report.id}
                        coordinate={report.location}
                        title={report.title}
                        description={report.description}
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
