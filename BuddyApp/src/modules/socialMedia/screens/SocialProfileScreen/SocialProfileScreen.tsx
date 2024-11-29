import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostCard from '../../components/PostCard/PostCard';

type SocialProfileProps = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    bio: string;
    posts: any[];
};

type PostCardProps = {
    id: string;
    username: string;
    content: string;
    userImage: string;
    postImage: string;
    postId: string;
};

const SocialProfile = ({ route, navigation }: { route: any; navigation: any }) => {
    const { userId } = route.params;

    const [user, setUser] = useState<SocialProfileProps>({
        id: '',
        name: '',
        username: '',
        avatar: '',
        bio: '',
        posts: [],
    });

    const [userPosts, setUserPosts] = useState<PostCardProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const retrieveUser = async () => {
        try {
            const data = await fakeFetchUser(userId);
            setUser(data);
            console.log('User data:', data);
            retrieveUserPosts(data)
        } catch (error) {
            console.log(error);
        }
    };

    const retrieveUserPosts = async (userData?: any) => {
        if (loading || !hasMore) return;

        if (!userData) {
            userData = user;
        }


        setLoading(true);
        try {
            const data = await fakeFetchUserPosts(userId, page, userData);
            const newPosts = data.posts || [];
            if (newPosts.length === 0) {
                setHasMore(false); // No more posts to fetch
            } else {
                setPage((prevPage) => prevPage + 1); // Increment page
                setUserPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append new posts
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        retrieveUser(); // Fetch user data
    }, []);

    const fakeFetchUser = async (userId: string): Promise<SocialProfileProps> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    id: userId,
                    name: 'John Doe',
                    username: 'johndoe',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
                    bio: 'Animal lover, photographer, and outdoor enthusiast 🐾📸🌲',
                    posts: [],
                });
            }, 500);
        });
    };

    const fakeFetchUserPosts = async (
        userId: string,
        page: number,
        userData: any
    ): Promise<{ posts: PostCardProps[] }> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('fakeFetchUserPosts', user);
                const numPerPage = 5;
                const start = page * numPerPage;
                const posts = Array(numPerPage)
                    .fill(null)
                    .map((_, i) => ({
                        id: (start + i).toString(),
                        username: userData.username,
                        content: `Post content ${start + i + 1}`,
                        userImage: userData.avatar,
                        postImage: `https://placecats.com/300/20${page * numPerPage + i}`,
                        postId: (start + i).toString(),
                    }));
                resolve({ posts });
            }, 1000);
        });
    };

    const renderFooter = () => {
        if (!loading) return null;
        return <ActivityIndicator style={{ marginVertical: 20 }} />;
    };

    return (
        <View style={styles.container}>
            {/* Profile Header */}
            <View style={styles.header}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.bio}>{user.bio}</Text>
            </View>

            {/* User's Posts */}
            <Text style={styles.sectionTitle}>Posts</Text>
            <FlatList
                data={userPosts}
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
                onEndReached={() => retrieveUserPosts()}
                onEndReachedThreshold={0.5} // Trigger when 50% away from bottom
                ListFooterComponent={renderFooter}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#1E90FF',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    bio: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: '#1E90FF',
        padding: 10,
        borderRadius: 50,
        elevation: 5,
    },
});

export default SocialProfile;
