import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import CommentCard from './components/CommentCard/CommentCard';
import ReplyModal from './components/ReplyModal/ReplyModal';
import styles from './CommentScreen.style';

type Comment = {
    id: string;
    username: string;
    avatar: string;
    text: string;
    timestamp: string;
    likeCount: number;
    likedByUser: boolean;
    replies: Reply[];
};


type Reply = {
    id: string;
    username: string;
    avatar: string;
    text: string;
    timestamp: string;
};



const CommentScreen = ({ route }: { route: any }) => {
    const { postId } = route.params;

    const [comments, setComments] = useState<Comment[]>([
        {
            id: '1',
            username: 'JohnDoe',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            text: 'Great post!',
            timestamp: '2h ago',
            likeCount: 5,
            likedByUser: false,
            replies: [
                {
                    id: '101',
                    username: 'JaneSmith',
                    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                    text: 'I agree! So nice!',
                    timestamp: '1h ago',
                },
            ],
        },
        {
            id: '2',
            username: 'JaneSmith',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            text: 'This is adorable! 🐾',
            timestamp: '1h ago',
            likeCount: 0,
            likedByUser: false,
            replies: [],
        },
    ]);

    const [newComment, setNewComment] = useState('');
    const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);

    const handleAddComment = () => {
        if (newComment.trim() === '') return;

        const newCommentObj: Comment = {
            id: (comments.length + 1).toString(),
            username: 'CurrentUser',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            text: newComment,
            timestamp: 'Just now',
            likeCount: 0,
            likedByUser: false,
            replies: [],
        };

        setComments((prevComments) => [newCommentObj, ...prevComments]);
        setNewComment('');
    };

    const handleAddReply = (replyText: string) => {
        if (!replyToCommentId || replyText.trim() === '') return;

        const newReply: Reply = {
            id: (Math.random() * 10000).toFixed(0),
            username: 'CurrentUser',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            text: replyText,
            timestamp: 'Just now',
        };

        setComments((prevComments) =>
            prevComments.map((comment) => {
                if (comment.id === replyToCommentId) {
                    return { ...comment, replies: [...comment.replies, newReply] };
                }
                return comment;
            })
        );

        setReplyToCommentId(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comments</Text>

            {/* Comment List */}
            <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CommentCard comment={item} onReply={(id) => setReplyToCommentId(id)} />
                )}
                style={styles.commentList}
            />

            {/* Add Comment Section */}
            <View style={styles.addCommentSection}>
                <TextInput
                    style={styles.input}
                    placeholder="Write a comment..."
                    value={newComment}
                    onChangeText={setNewComment}
                />
                <TouchableOpacity onPress={handleAddComment} style={styles.button}>
                    <Text style={styles.buttonText}>Post</Text>
                </TouchableOpacity>
            </View>

            {/* Reply Modal */}
            <ReplyModal
                visible={replyToCommentId !== null}
                onSubmit={handleAddReply}
                onClose={() => setReplyToCommentId(null)}
            />
        </View>
    );
};

export default CommentScreen;
