import React, { useEffect, useState } from 'react';
import {
    FlatList,
    View,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';
import PostCard from './components/PostCard/PostCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './FeedScreen.style';

const FeedScreen = ({ navigation }: { navigation: any }) => {
    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]); // For search functionality
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);

    const retrievePosts = async () => {
        try {
            setLoading(true);
            const data = await fakeFetchPosts(page);
            setLoading(false);
            const newPosts: any[] = data.posts || [];
            if (newPosts.length > 0) {
                setPage((prevPage) => prevPage + 1);
            }
            setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            setFilteredPosts((prevPosts) => [...prevPosts, ...newPosts]); // Sync filtered posts
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        retrievePosts();
    }, []);

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator style={{ marginVertical: 20 }} />;
    };

    const fakeFetchPosts = async (page: number): Promise<any> => {
        console.log('fakeFetchPosts', page);
        return new Promise((resolve) => {
            setTimeout(() => {
                if (page > 1) {
                    resolve({ posts: [] });
                    return;
                }

                const numPerPage = 5;
                const response = Array(numPerPage)
                    .fill(null)
                    .map((_, i) => ({
                        id: page * numPerPage + i + '',
                        username: `PetLover${page * numPerPage + i}`,
                        content: 'Best buddies forever! 🐾',
                        userImage: `https://randomuser.me/api/portraits/men/${
                            page * numPerPage + i
                        }.jpg`,
                        postImage: `https://placecats.com/300/20${page * numPerPage + i}`,
                    }));
                resolve({
                    posts: response,
                });
            }, 1000);
        });
    };

    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text.trim() === '') {
            setFilteredPosts(posts);
            return;
        }

        const filtered = posts.filter(
            (post) =>
                post.username.toLowerCase().includes(text.toLowerCase()) ||
                post.content.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredPosts(filtered);
    };

    const handleNewPost = (newPost: any) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        setFilteredPosts((prevPosts) => [newPost, ...prevPosts]);
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
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <PostCard
                        username={item.username}
                        content={item.content}
                        userImage={item.userImage}
                        postImage={item.postImage}
                        postId={item.id}
                    />
                )}
                onEndReached={() => {
                    if (!loading) retrievePosts(); // Fetch more posts on scroll down
                }}
                onEndReachedThreshold={0.5} // Trigger when 50% away from bottom
                ListFooterComponent={renderFooter}
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
