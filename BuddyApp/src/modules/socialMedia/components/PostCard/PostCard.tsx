import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Share, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './PostCard.style';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import ImageDetail from '../ImageDetail/ImageDetail';
import { SocialMediaStackParamList } from '../../navigation/NavigationTypes';

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

    const navigateToComments = () => {
        navigation.navigate('Comments', { postId });
    };

    const navigateToProfile = () => {
        navigation.navigate('SocialProfile', {
            userId: '123',
        });
    };

    const handleShare = async () => {
        try {
            const result = await Share.share({
                message: `Check out this post by ${username}: ${content}\n${postImage}`,
                url: postImage, // If sharing an image URL
                title: `Post by ${username}`, // Title for iOS
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(`Shared with activity type: ${result.activityType}`);
                } else {
                    console.log('Post shared successfully.');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed.');
            }
        } catch (error) {
            Alert.alert('Error', 'Unable to share the post.');
            console.error('Error sharing post:', error);
        }
    };

    return (
        <View style={styles.card}>
            {/* User Info */}
            
            <TouchableOpacity style={styles.header} onPress={navigateToProfile}>
                {  userImage && <Image source={{ uri: userImage }} style={styles.userImage} />}
                <Text style={styles.username}>{username}</Text>
            </TouchableOpacity>

            {/* Post Image (Click to View Details) */}
            {postImage && <TouchableOpacity onPress={() => setImageDetailVisible(true)}>
                <Image source={{ uri: postImage }} style={styles.postImage} />
            </TouchableOpacity>
}
            {/* Post Content */}
            <Text style={styles.content}>{ content }</Text>
            {/* <Text>{ postImage }</Text> */}

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

                <TouchableOpacity style={styles.actionButton} onPress={navigateToComments}>
                    <Icon name="comment-o" size={20} color="gray" />
                    <Text style={styles.actionText}>Comment</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
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
