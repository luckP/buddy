import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../constants/theme';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAF9F7',
    },

    container: {
        flex: 1,
    },

    flatListContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        padding: 16,
    },

    messageBubble: {
        marginVertical: 6,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        maxWidth: '80%',
    },

    userMessage: {
        backgroundColor: COLORS.primary,
        alignSelf: 'flex-end',
        borderTopRightRadius: 4,
    },

    assistantMessage: {
        backgroundColor: '#F5F3F1',
        alignSelf: 'flex-start',
        borderTopLeftRadius: 4,
    },

    messageText: {
        fontSize: 16,
        color: COLORS.black,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 10,
        paddingTop: 8,
        backgroundColor: '#FAF9F7',
    },

    textInput: {
        flex: 1,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: '#fff',
        maxHeight: 120,
        overflow: 'scroll',
    },

    voiceButton: {
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 50,
        marginLeft: 8,
    },

    sendButton: {
        backgroundColor: COLORS.info,
        padding: 12,
        borderRadius: 50,
        marginLeft: 6,
    },

    scrollToBottomButton: {
        position: 'absolute',
        bottom: 160,
        right: 16,
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 24,
        elevation: 4,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingIndicator: {
        position: 'absolute',
        bottom: 140,
        alignSelf: 'center',
    },

    bottomInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 70, // reserve space for floating mic
        backgroundColor: '#FAF9F7',
    },

    bubbleInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 24,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        maxHeight: 120,
    },

    attachmentButton: {
        marginLeft: 10,
        padding: 8,
        borderRadius: 50,
        backgroundColor: '#F0F0F0',
    },

    sendButtonCircle: {
        backgroundColor: COLORS.info,
        padding: 8,
        borderRadius: 20,
        marginRight: 8,
    },

    imageButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
    },

    floatingMicButton: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 16,
        backgroundColor: COLORS.primary,
        padding: 16,
        borderRadius: 50,
        elevation: 5,
        zIndex: 10,
    },

    chatInputWrapper: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
    },

    chatInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        elevation: 2,
    },

    chatTextInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        paddingRight: 10,
        maxHeight: 100,
    },

    buttonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    iconButton: {
        backgroundColor: '#F3F3F3',
        borderRadius: 24,
        padding: 10,
        marginLeft: 4,
    },

});

export default styles;
