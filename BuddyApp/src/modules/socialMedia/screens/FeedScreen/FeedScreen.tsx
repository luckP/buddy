import axios from 'axios';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostCard from '../../components/PostCard/PostCard';
import styles from './FeedScreen.style';

const API_BASE_URL = 'http://localhost:3836/api'; // Backend URL

const FeedScreen = ({ navigation }: { navigation: any }) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // ✅ Fetch posts from backend
    const fetchFeedPosts = async () => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const auth = getAuth();
            const user = auth.currentUser;

            if (!user) {
                console.error('User not authenticated');
                return;
            }

            const token = await user.getIdToken();

            const response = await axios.get(`${API_BASE_URL}/posts/feed?page=${page}&limit=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.warn('TEST::', response.data.posts);

            console.log('------------------------------------------------------');


            const newPosts = response.data.posts || [];

            if (newPosts.length === 0) {
                setHasMore(false); // No more posts to fetch
            }

            setPosts(prevPosts => [...prevPosts, ...newPosts]);
            setFilteredPosts(prevPosts => [...prevPosts, ...newPosts]); // Sync filtered posts
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Error fetching feed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeedPosts();
    }, []);

    // ✅ Handle search filtering
    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text.trim() === '') {
            setFilteredPosts(posts);
            return;
        }

        const filtered = posts.filter(
            post =>
                post.author.username.toLowerCase().includes(text.toLowerCase()) ||
                post.content.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    const handleNewPost = (newPost: any) => {
        setPosts(prevPosts => [newPost, ...prevPosts]);
        setFilteredPosts(prevPosts => [newPost, ...prevPosts]);
    };

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                style={styles.searchBar}
                placeholder="Search posts or users..."
                value={searchText}
                onChangeText={handleSearch}
            />

            {/* Post List */}
            <FlatList
                data={filteredPosts}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <PostCard
                        username={item.author.username}
                        content={item.content}
                        userImage={item.author.profileImage}
                        postImage={item.images.length > 0 ? item.images[0] : null}
                        postId={item._id}
                        />
                )}
                onEndReached={() => fetchFeedPosts()} // Load more posts on scroll
                onEndReachedThreshold={0.5} // Load more when 50% away from bottom
                ListFooterComponent={loading ? <ActivityIndicator style={{ marginVertical: 20 }} /> : null}
            />

            {/* Floating Button */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() =>
                    navigation.navigate('CreatePost', { onPostCreated: handleNewPost })
                }
            >
                <Icon name="plus" size={24} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

export default FeedScreen;
