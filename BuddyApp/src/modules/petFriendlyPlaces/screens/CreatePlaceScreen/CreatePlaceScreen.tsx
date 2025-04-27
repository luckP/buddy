/**
 * Componente CreatePlaceScreen
 *
 * Permite ao utilizador adicionar um novo local pet-friendly, incluindo nome, descrição,
 * até 5 imagens, e localização geográfica (selecionável num mapa ou obtida automaticamente).
 * 
 * Funções:
 * - handlePickImages: abre a galeria para escolher até 5 imagens.
 * - handleGetLocation: solicita permissão e obtém a localização atual do utilizador.
 * - handleSubmit: valida os dados e envia o local para o servidor.
 * 
 * Utiliza react-native-maps para visualização no mapa com um pino fixo ao centro.
 */

import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import * as Location from 'react-native-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';
import { uploadPlace } from '../../services/placesService';
import styles from './CreatePlaceScreen.style';

const MAX_IMAGES = 5;

const CreatePlaceScreen = ({ navigation }: { navigation: any }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [location, setLocation] = useState<{ latitude: number, longitude: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const mapRef = useRef<MapView | null>(null);

    useEffect(() => {
        handleGetLocation();
    }, []);

    /**
     * Abre a galeria de imagens para o utilizador escolher até 5 imagens.
     */
    const handlePickImages = async () => {
        const result = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: MAX_IMAGES - images.length,
        });

        if (!result.didCancel && result.assets) {
            const newUris = result.assets.map(asset => asset.uri!).filter(Boolean);
            setImages(prev => [...prev, ...newUris].slice(0, MAX_IMAGES));
        }
    };

    /**
     * Solicita permissão e obtém a localização atual do utilizador.
     * Atualiza a posição no mapa e centra a vista.
     */
    const handleGetLocation = async () => {
        const permission = await Location.requestPermission({ ios: "whenInUse" });
        if (!permission) {
            Alert.alert("Permissão negada", "É necessária permissão de localização.");
            return;
        }

        const currentLocation = await Location.getLatestLocation();
        if (currentLocation) {
            const coords = {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
            };
            setLocation(coords);

            mapRef.current?.animateToRegion({
                ...coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }, 500);
        }
    };

    /**
     * Valida os dados e envia o novo local para o backend.
     */
    const handleSubmit = async () => {
        if (!name || !description || !location || images.length === 0) {
            Alert.alert("Campos em falta", "Preencha todos os campos e adicione pelo menos uma imagem.");
            return;
        }

        setLoading(true);
        try {
            await uploadPlace({ name, description, images, location });
            Alert.alert("Sucesso", "Local adicionado com sucesso!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível adicionar o local.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Adicionar novo local pet-friendly</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome do local"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={[styles.input, styles.textarea]}
                placeholder="Descrição"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <TouchableOpacity onPress={handlePickImages} style={styles.imagePickerButton}>
                <Icon name="image" size={20} color="#fff" />
                <Text style={styles.imagePickerButtonText}>
                    Escolher imagens ({images.length}/{MAX_IMAGES})
                </Text>
            </TouchableOpacity>

            <ScrollView horizontal>
                {images.map((uri, index) => (
                    <Image key={index} source={{ uri }} style={styles.previewImage} />
                ))}
            </ScrollView>

            {/* Mapa com pino fixo */}
            <View style={styles.mapContainer}>
                <MapView
                    ref={mapRef}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: location?.latitude || 0,
                        longitude: location?.longitude || 0,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    onRegionChangeComplete={(region) => {
                        setLocation({ latitude: region.latitude, longitude: region.longitude });
                    }}
                />
                <View style={styles.pinContainer} pointerEvents="none">
                    <Image
                        source={require('../../../../assets/images/location-pin.png')}
                        style={styles.pinIcon}
                        resizeMode="contain"
                    />
                </View>
            </View>

            <TouchableOpacity onPress={handleGetLocation} style={styles.locationButton}>
                <Text style={styles.locationButtonText}>
                    Centrar no meu local atual
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} disabled={loading}>
                <Text style={styles.submitButtonText}>{loading ? "A enviar..." : "Submeter"}</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CreatePlaceScreen;
