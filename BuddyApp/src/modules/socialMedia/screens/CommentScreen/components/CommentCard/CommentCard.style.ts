import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    comment: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 3,
        elevation: 2,
    },
    commentRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    content: {
        flex: 1,
    },
    username: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    text: {
        fontSize: 14,
        color: '#555',
        marginTop: 5,
    },
    timestamp: {
        fontSize: 12,
        color: '#aaa',
        marginTop: 5,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeButtonText: {
        fontSize: 14,
        color: '#555',
        marginLeft: 5,
    },
    replyButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyButtonText: {
        fontSize: 14,
        color: '#1E90FF',
        marginLeft: 5,
    },
    replies: {
        marginTop: 10,
        paddingLeft: 20,
        borderLeftWidth: 1,
        borderLeftColor: '#ddd',
    },
    replyRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 5,
    },
    avatarSmall: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 10,
    },
    icon: {
        marginRight: 5,
    },
});
