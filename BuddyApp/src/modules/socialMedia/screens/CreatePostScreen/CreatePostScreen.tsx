import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Alert,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const CreatePost = ({ navigation, route }: { navigation: any; route: any }) => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
        });

        if (!result.didCancel && result.assets && result.assets[0].uri) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        if (!content.trim()) {
            Alert.alert('Error', 'Please write some content for your post.');
            return;
        }

        const newPost = {
            id: Math.random().toString(),
            username: 'CurrentUser',
            content,
            userImage: 'https://randomuser.me/api/portraits/men/99.jpg', // Placeholder for the current user's avatar
            postImage: image,
        };

        // Pass the new post back to the FeedScreen
        if (route.params?.onPostCreated) {
            route.params.onPostCreated(newPost);
        }

        navigation.goBack();
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
            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Post</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textInput: {
        height: 100,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        marginBottom: 20,
        textAlignVertical: 'top',
    },
    previewImage: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
    },
    imagePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    imagePickerButtonText: {
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#1E90FF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CreatePost;
