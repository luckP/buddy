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
import * as Location from 'react-native-location';
import Icon from 'react-native-vector-icons/FontAwesome';
import { API_BASE_URL, createPost } from '../../services/postService';
import styles from './CreatePostScreen.style';




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

            // ✅ Ask for permission (this shows the native prompt)
            const permissionGranted = await Location.requestPermission({
                ios: 'whenInUse',
                android: {
                    detail: 'fine',
                },
            });

            if (!permissionGranted) {
                Alert.alert('Permission Denied', 'Location permission is required to create a post.');
                setLoading(false);
                return;
            }
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

            // ✅ Handle the response
            newPost.images = handleImageResponse(newPost);

            console.log('DEBUG: Post created successfully:', newPost);

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

    /**
     * Handler the image new post
     */
    const handleImageResponse = (newPost: any) => {
        if (newPost.images.length === 0) {
            return [];
        }

        const baseUrl = API_BASE_URL.replace('/api', '');
        return newPost.images.map((img: string) => `${baseUrl}${img}`);


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
