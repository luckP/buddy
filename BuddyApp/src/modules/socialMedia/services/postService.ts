import axios from 'axios';
import { getAuth } from 'firebase/auth';

const API_BASE_URL = 'http://localhost:3836/api';

export const createPost = async (content: string, image: string | null, location: any) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) throw new Error('User is not authenticated');

    const token = await user.getIdToken();
    console.log('DEBUG: Firebase Auth Token:', token);

    let parsedLocation;
    try {
        parsedLocation = JSON.stringify(location);
    } catch (error) {
        throw new Error('Invalid location format');
    }

    const formData = new FormData();
    formData.append('content', content);
    formData.append('tags', JSON.stringify([]));
    formData.append('visibility', 'public');
    formData.append('location', parsedLocation);

    console.log('createPost image', image)

    if (image) {
        const filename = image.split('/').pop();
        const match = /\.(\w+)$/.exec(filename || '');
        const type = match ? `image/${match[1]}` : 'image/jpeg'; // ✅ Default to `image/jpeg` if undefined

        formData.append('images', {
            uri: image,
            name: filename || `upload-${Date.now()}.jpg`, // ✅ Ensure a valid filename
            type,
        } as any);
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/posts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        });

        console.log('DEBUG: Post Created:', response.data);
        return response.data;
    } catch (error) {
        console.error('ERROR: Failed to create post', error);
        throw error;
    }
};

