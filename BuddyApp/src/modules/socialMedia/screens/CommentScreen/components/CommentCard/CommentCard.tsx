import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './CommentCard.style';

type CommentCardProps = {
    comment: {
        id: string;
        username: string;
        avatar: string;
        text: string;
        timestamp: string;
        likeCount: number;
        likedByUser: boolean;
        replies: {
            id: string;
            username: string;
            avatar: string;
            text: string;
            timestamp: string;
        }[];
    };
    onReply: (id: string) => void;
};

const CommentCard: React.FC<CommentCardProps> = ({ comment, onReply }) => {
    const [likeCount, setLikeCount] = useState(comment.likeCount);
    const [likedByUser, setLikedByUser] = useState(comment.likedByUser);

    const toggleLike = () => {
        setLikeCount((prevCount) => (likedByUser ? prevCount - 1 : prevCount + 1));
        setLikedByUser((prevLiked) => !prevLiked);
    };

    return (
        <View style={styles.comment}>
            {/* Main Comment */}
            <View style={styles.commentRow}>
                <Image source={{ uri: comment.avatar }} style={styles.avatar} />
                <View style={styles.content}>
                    <Text style={styles.username}>{comment.username}</Text>
                    <Text style={styles.text}>{comment.text}</Text>
                    <Text style={styles.timestamp}>{comment.timestamp}</Text>
                </View>
            </View>

            {/* Like and Reply Buttons */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
                    <Icon
                        name={likedByUser ? 'heart' : 'heart-o'}
                        size={20}
                        color={likedByUser ? 'red' : 'gray'}
                        style={styles.icon}
                    />
                    <Text style={styles.likeButtonText}>{likeCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onReply(comment.id)} style={styles.replyButton}>
                    <Icon name="reply" size={20} color="#1E90FF" style={styles.icon} />
                    <Text style={styles.replyButtonText}>Reply</Text>
                </TouchableOpacity>
            </View>

            {/* Replies */}
            {comment.replies.length > 0 && (
                <View style={styles.replies}>
                    {comment.replies.map((reply) => (
                        <View key={reply.id} style={styles.replyRow}>
                            <Image source={{ uri: reply.avatar }} style={styles.avatarSmall} />
                            <View style={styles.content}>
                                <Text style={styles.username}>{reply.username}</Text>
                                <Text style={styles.text}>{reply.text}</Text>
                                <Text style={styles.timestamp}>{reply.timestamp}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default CommentCard;
