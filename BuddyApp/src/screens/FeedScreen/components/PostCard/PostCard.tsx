import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './PostCard.style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { SocialMediaStackParamList } from '../../../../navigation/NavigationTypes';
import ImageDetail from '../ImageDetail/ImageDetail';

type PostCardProps = {
    username: string;
    content: string;
    userImage: string;
    postImage: string;
    postId: string;
};

type NavigationProp = NativeStackNavigationProp<SocialMediaStackParamList, 'Feed'>;

const PostCard: React.FC<PostCardProps> = ({ username, content, userImage, postImage, postId }) => {
    const navigation = useNavigation<NavigationProp>();
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const [isImageDetailVisible, setImageDetailVisible] = useState(false);

    const toggleLike = () => {
        setLiked((prevLiked) => !prevLiked);
        setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    };

    const navifateToComments = () => {
        navigation.navigate('Comments', { postId });
    }

    const navigateToProfile = () => {
        navigation.navigate('SocialProfile', {
            userId: '123',
        });
    }

    return (
        <View style={styles.card}>
            {/* User Info */}
            <TouchableOpacity style={styles.header} onPress={navigateToProfile}>
                <Image source={{ uri: userImage }} style={styles.userImage} />
                <Text style={styles.username}>{username}</Text>
            </TouchableOpacity>

            {/* Post Image (Click to View Details) */}
            <TouchableOpacity onPress={() => setImageDetailVisible(true)}>
                <Image source={{ uri: postImage }} style={styles.postImage} />
            </TouchableOpacity>

            {/* Post Content */}
            <Text style={styles.content}>{content}</Text>

            {/* Like, Comment, and Share Section */}
            <View style={styles.actions}>
            <TouchableOpacity onPress={toggleLike} style={styles.actionButton}>
                    <Icon
                        name={liked ? 'heart' : 'heart-o'}
                        size={20}
                        color={liked ? 'red' : 'gray'}
                    />
                    <Text style={styles.actionText}>{likeCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={navifateToComments}>
                    <Icon name="comment-o" size={20} color="gray" />
                    <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                    <Icon name="share" size={20} color="gray" />
                    <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
            </View>

            {/* Image Detail Modal */}
            <ImageDetail
                visible={isImageDetailVisible}
                imageUrl={postImage}
                onClose={() => setImageDetailVisible(false)}
            />
        </View>
    );
};

export default PostCard;











