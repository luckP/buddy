import {
    StyleSheet
} from 'react-native';
import { COLORS } from '../../../../constants/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
    },

    messageBubble: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '80%',
    },

    userMessage: {
        backgroundColor: COLORS.success,
        alignSelf: 'flex-end',
    },

    assistantMessage: {
        backgroundColor: COLORS.secondary,
    },

    messageText: {
        fontSize: 16,
    },

    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray,
        alignItems: 'flex-start',
    },

    textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.gray,
        borderRadius: 8,
        padding: 10,
        marginRight: 10,

        maxHeight: 120,
        overflow: 'scroll',
    },

    sendButton: {
        backgroundColor: COLORS.info,
        padding: 10,
        borderRadius: 8,
    },

    sendButtonDisabled: {
        backgroundColor: COLORS.gray,
    },

    sendButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },

    backButton: {
        color: COLORS.info,
        fontSize: 16,
        paddingLeft: 10
    },


    voiceButton: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 8,
        marginRight: 5,
    },
    voiceButtonText: {
        fontSize: 16,
    },

    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },

    flatListContent: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        padding: 10,
    },

    scrollToBottomButton: {
        position: 'absolute',
        bottom: 170,
        right: 10,
        backgroundColor: COLORS.primary,
        padding: 12,
        borderRadius: 24,
        elevation: 6,
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },

    loadingIndicator: {
        position: 'absolute',
        bottom: 140,
        alignSelf: 'center',
    },

});

export default styles;