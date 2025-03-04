import React, { useState } from 'react';
import {
    Alert,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import * as Location from 'react-native-location'; // ✅ Import Location API
import Icon from 'react-native-vector-icons/FontAwesome';
import { createPost } from '../../services/postService';
import styles from './CreatePostScreen.style';




const API_BASE_URL = 'http://localhost:3836/api'; // ✅ Backend base URL

const CreatePost = ({ navigation, route }: { navigation: any; route: any }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
        });

        if (!result.didCancel && result.assets && result.assets[0].uri) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = async () => {
        if (!content.trim()) {
            Alert.alert('Error', 'Please write some content for your post.');
            return;
        }
    
        setLoading(true);
    
        try {
            // ✅ Get user location safely
            const userLocation = await Location.getLatestLocation();
            if (!userLocation || !userLocation.longitude || !userLocation.latitude) {
                Alert.alert('Error', 'Failed to retrieve location. Ensure GPS is enabled.');
                return;
            }
    
            // ✅ Structure the location object correctly
            const location = {
                type: 'Point',
                coordinates: [userLocation.longitude, userLocation.latitude],
            };
    
            console.log('DEBUG: Creating post with location:', location);
    
            // ✅ Send post request to backend
            const newPost = await createPost(content, image, location);
    
            Alert.alert('Success', 'Post created successfully!');
            if (route.params?.onPostCreated) {
                route.params.onPostCreated(newPost);
            }
            navigation.goBack();
        } catch (error: any) {
            console.error('ERROR: Failed to create post:', error.response?.data || error.message);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create a New Post</Text>

            {/* Content Input */}
            <TextInput
                style={styles.textInput}
                placeholder="Write something..."
                multiline
                value={content}
                onChangeText={setContent}
            />

            {/* Image Picker */}
            {image && (
                <Image source={{ uri: image }} style={styles.previewImage} />
            )}
            <TouchableOpacity onPress={handleImagePicker} style={styles.imagePickerButton}>
                <Icon name="camera" size={20} color="#fff" />
                <Text style={styles.imagePickerButtonText}>Choose Image</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton} disabled={loading}>
                <Text style={styles.submitButtonText}>{loading ? 'Posting...' : 'Post'}</Text>
            </TouchableOpacity>
        </View>
    );
};


export default CreatePost;
